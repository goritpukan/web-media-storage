'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '@/lib/providers/AuthenticationProvider';
import { useRouter } from 'next/navigation';
import { Alert, Button, Paper, Snackbar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Loader from '@/components/loader/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { IUser } from '@/types/user';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Page() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'firstName', headerName: 'First name', width: 200, editable: true },
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
          <DeleteForeverIcon/>
        </Button>
      )
    }
  ];

  const [error, setError] = useState<string | null>(null);
  const { user, isLoading } = useContext(AuthenticationContext);
  const router = useRouter();
  const queryClient = useQueryClient();
  useEffect(() => {
    console.log(isLoading, user);
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
    try{
      const response = await api.delete(`/user/${id}`);
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    }catch(error){
      console.error('Delete failed', error);
      throw error;
    }
  }

  if (!user || user?.role != 'ADMIN' || isPending) {
    return <Loader />;
  }

  return (
    <Paper sx={{ height: 400, width: '80%', margin: 'auto' }}>
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
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
