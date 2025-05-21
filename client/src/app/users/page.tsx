'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import { useRouter } from 'next/navigation';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loader from '@/components/loader/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { IUser } from '@/types/user';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddUserForm from '@/components/add-user-form/AddUserForm';

function AddIcon() {
  return null;
}

export default function Page() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 200,
      editable: true,
    },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 200, editable: true },
    { field: 'role', headerName: 'Role', width: 130, editable: true },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button onClick={() => handleRowDelete(params.row.id)}>
          <DeleteForeverIcon />
        </Button>
      ),
    },
  ];

  const { user, isLoading } = useContext(AuthenticationContext);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
    if (!isLoading && user?.role !== 'ADMIN') {
      router.push('/unauthorized');
      return;
    }
  }, [user, isLoading]);

  const { isPending, data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('user');
      return response.data;
    },
  });

  const handleRowUpdate = async (updatedRow: IUser) => {
    try {
      const response = await api.patch(`/user/${updatedRow.id}`, updatedRow);
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      return response.data;
    } catch (error) {
      console.error('Update failed', error);
      throw error;
    }
  };

  const handleRowDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/user/${id}`);
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
      console.error('Delete failed', error);
      throw error;
    }
  };

  if (!user || user?.role != 'ADMIN' || isPending) {
    return <Loader />;
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <AddUserForm handleClose={() => setOpenDialog(false)} />
        </DialogContent>
      </Dialog>
      <Paper sx={{ height: 400, width: '80%', margin: 'auto' }}>
        <Button
          sx={{ margin: '10px' }}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add User
        </Button>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          editMode={'row'}
          processRowUpdate={handleRowUpdate}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
}
