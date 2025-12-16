// domain/enrollment/enrollment.constants.js

// Estados que puede tener una inscripción
export const ENROLLMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected'
}

// Razones por las que puede fallar
export const ENROLLMENT_ERROR = {
  GROUP_FULL: 'group_full',
  PERIOD_CLOSED: 'period_closed',
  ALREADY_ENROLLED: 'already_enrolled',
  STUDENT_NOT_ELIGIBLE: 'student_not_eligible',
  INVALID_DNI: 'invalid_dni'
}

// Mensajes user-friendly
export const ENROLLMENT_ERROR_MESSAGES = {
  [ENROLLMENT_ERROR.GROUP_FULL]: 'El grupo está completo',
  [ENROLLMENT_ERROR.PERIOD_CLOSED]: 'El período de inscripción finalizó',
  [ENROLLMENT_ERROR.ALREADY_ENROLLED]: 'Ya estás inscrito en este grupo',
  [ENROLLMENT_ERROR.STUDENT_NOT_ELIGIBLE]: 'No cumples los requisitos',
  [ENROLLMENT_ERROR.INVALID_DNI]: 'DNI inválido'
}

// Valores de negocio
export const CAPACITY_WARNING_THRESHOLD = 0.8  // 80%
export const MIN_DNI_LENGTH = 7
export const MAX_DNI_LENGTH = 8