import { Card, Typography } from "@material-tailwind/react";
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from '../config/axios';
import { useAuth } from '../hooks/useAuth';
 
const TABLE_HEAD = ["Tipo da ocorrência", "Data do ocorrido", "Status"];

export const TableDenuncias = () => {
  const { user } = useAuth();
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    if (!user) return;   

    (async () => {
      const res = await axios.get('/denuncias');
      const filter = res.data.filter((denuncia) => denuncia.usuarioId === user.id)

      setTableRows(filter);
    })()
  }, []);

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(({ categoria, data_denuncia, status }, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={categoria+data_denuncia+status+index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {categoria}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {format(data_denuncia, "dd/MM/yyyy")}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {status}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  )
}