import React from 'react'
import AlertIcon from '@assets/icons/AlertIcon'

const STATUS_CONFIG = {
  success: {
    banner: null,
    tableHeaderBg: 'bg-slate-200',
    headers: ['DNI', 'Nombre y apellido', 'Carrera'],
    renderRow: (item, index) => (
      <tr key={index} className="border-b border-slate-100">
        <td className="px-4 py-2 text-sm bg-white text-slate-600">{item.dni}</td>
        <td className="px-4 py-2 text-sm bg-white text-slate-600">
          {item.first_name} {item.last_name}
        </td>
        <td className="px-4 py-2 text-sm bg-white text-slate-600 max-w-32">{item.career}</td>
      </tr>
    ),
  },
  error: {
    banner: {
      bg: 'bg-red-100 border-red-200',
      text: 'text-red-700',
      title: 'Errores detectados:',
    },
    tableHeaderBg: 'bg-white',
    headers: ['Fila', 'Errores'],
    renderRow: (item, index) => (
      <tr key={index} className="border-b border-red-200">
        <td className="px-4 py-2 text-sm bg-red-100 text-slate-600">{item.fileRow}</td>
        <td className="px-4 py-2 text-sm bg-red-100 text-red-700">{item.errorMessage}</td>
      </tr>
    ),
  },
  warning: {
    banner: {
      bg: 'bg-amber-100 border-amber-200',
      text: 'text-amber-700',
      title: 'Alumnos ya existentes en base de datos:',
    },
    tableHeaderBg: 'bg-white',

    headers: ['Fila', 'Nombre y apellido', 'DNI'],
    renderRow: (item, index) => (
      <tr key={index} className="border-b border-amber-200">
        <td className="px-4 py-2 text-sm bg-amber-100 text-slate-600">
          {item.fileRow || index + 1}
        </td>

        <td className="px-4 py-2 text-sm bg-amber-100 text-slate-600">
          {item.first_name} {item.last_name}
        </td>

        <td className="px-4 py-2 text-sm bg-amber-100 text-amber-700 font-medium">{item.dni}</td>
      </tr>
    ),
  },
}

const StudentsBulkUploadTable = ({ status = 'success', data = [] }) => {
  const config = STATUS_CONFIG[status]

  if (!config) return null

  return (
    <div className="w-full flex flex-col gap-2">
      {config.banner && (
        <div
          className={`w-full flex gap-6 px-6 py-4 rounded-lg overflow-hidden border ${config.banner.bg}`}
        >
          <AlertIcon className={config.banner.text} />
          <h3 className={`${config.banner.text} font-medium`}>
            {config.banner.title} ({data.length})
          </h3>
        </div>
      )}

      <div className="w-full flex flex-col rounded-lg overflow-hidden border border-slate-200">
        <table className="text-center align-middle">
          <thead>
            <tr>
              {config.headers.map((headerText, index) => (
                <th
                  key={index}
                  className={`px-4 py-2 text-base font-normal text-slate-700 ${config.tableHeaderBg}`}
                >
                  {headerText}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{data.map((item, index) => config.renderRow(item, index))}</tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentsBulkUploadTable
