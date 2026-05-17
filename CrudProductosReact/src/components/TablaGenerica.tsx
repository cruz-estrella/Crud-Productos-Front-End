import { useMemo, useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

import {
  Pagination,
  Input,
} from "@heroui/react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TablaGenericaProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowsPerPage?: number;
};

export default function TablaGenerica<T extends { id: number | string }>({
  columns,
  data,
  rowsPerPage = 5,
}: TablaGenericaProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // FILTRAR
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // PAGINACIÓN
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  return (
    <div className="flex flex-col gap-4">
      
      {/* BUSCADOR */}
      <Input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* TABLA */}
      <Table aria-label="Tabla genérica">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={String(column.key)}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {paginatedData.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {String(item[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINACIÓN */}
      <div className="flex justify-center">
        <Pagination
          total={totalPages}
          page={page}
          onChange={setPage}
        />
      </div>
    </div>
  );
}