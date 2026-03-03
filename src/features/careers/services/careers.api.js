import supabase from '@common/lib/supabase'

export const getCareer = async ({ id } = {}) => {
  try {
    let query = supabase.from('careers').select('*')

    if (id) query = query.eq('id', id)

    const { data, error } = await query.limit(1).maybeSingle()

    if (error) throw error

    return data ?? null
  } catch (error) {
    console.error(`Error en getCareer: ${error.message}. id: ${id}`)
    throw error
  }
}

export const getCareers = async () => {
  try {
    let query = supabase.from('careers').select('*')

    const { data, error } = await query

    if (error) throw error

    return data ?? []
  } catch (error) {
    console.error(`Error en getCareers: ${error.message}. Detalle: ${error.message}`)
    throw error
  }
}

export const createCareer = async (careerData) => {
  try {
    const { data, error } = await supabase.from('careers').insert(careerData).select().single()

    if (error) throw error

    return data
  } catch (error) {
    console.error(`Error en createCareer: ${error.message}`, careerData)
    throw error
  }
}

export const updateCareer = async ({ id, ...updates }) => {
  try {
    if (!id) throw new Error('ID es requerido para actualizar')

    const { data, error } = await supabase
      .from('careers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error(`Error en updateCareer: ${error.message}. ID: ${id}`, updates)
    throw error
  }
}

export const deleteCareer = async (id) => {
  try {
    const { error } = await supabase.from('careers').delete().eq('id', id)

    if (error) throw error

    return true
  } catch (error) {
    // 23503: error de FK
    if (error.code === '23503') {
      console.warn('Intento de borrar carrera con datos asociados')
      throw new Error('No se puede eliminar: La carrera tiene tutores o alumnos asociados.')
    }
    console.error(`Error en deleteCareer: ${error.message}. ID: ${id}`)
    throw error
  }
}
