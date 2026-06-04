import * as yup from 'yup'

export const studentRowSchema = yup.object().shape({
  first_name: yup.string().trim().required('El nombre es obligatorio'),
  last_name: yup.string().trim().required('El apellido es obligatorio'),
  dni: yup
    .string()
    .trim()
    .matches(/^[0-9]+$/, 'El DNI debe contener solo números')
    .min(7, 'El DNI debe tener al menos 7 cifras.')
    .max(8, 'El DNI no puede tener más de 8 cifras.')
    .test('unique-dni', 'DNI duplicado.', function (value, context) {
      if (!value) return true

      const seenDNIs = context.options.context?.seenDNIs // context.options.context permite leer variables externas que le pasemos a Yup al validar

      if (seenDNIs) {
        if (seenDNIs.has(value)) {
          return false
        }
        seenDNIs.add(value)
      }

      return true
    })
    .required('DNI faltante'),
  email: yup
    .string()
    .trim()
    .email('Formato de correo electrónico no válido')
    .nullable()
    .transform((value) => (value === '' ? null : value)),
  career: yup.string().trim().required('Carrera faltante.'),
})
