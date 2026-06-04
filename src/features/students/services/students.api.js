import supabase from '@common/lib/supabase'

export const getStudent = async ({ id }) => {
  const { data, error } = await supabase
    .from('students')
    .select('*, careers(name)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

// Legacy getStudents function
// export const getStudents = async () => {
//   const { data, error } = await supabase
//     .from('students')
//     .select('*, careers(name)')
//     .order('last_name')
//   if (error) throw error
//   return data ?? []
// }

export const getStudents = async ({ page = 1, pageSize = 10, search = '' }) => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('students')
    .select('*, careers(name)', { count: 'exact' })
    .order('last_name', { ascending: true })
    .range(from, to)

  if (search.trim()) {
    const words = search
      .replace(/,/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 0)

    if (words.length > 0) {
      words.forEach((word) => {
        const cleanWord = word.replace(/[%_]/g, '\\$&')
        query = query.or(
          `first_name.ilike.%${cleanWord}%,last_name.ilike.%${cleanWord}%,dni.ilike.%${cleanWord}%`
        )
      })
    }
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Error en getStudents API:', error.message)
    throw error
  }

  return {
    students: data ?? [],
    totalCount: count ?? 0,
  }
}

export const createStudent = async (studentData) => {
  const payload = { ...studentData, email: studentData.email || null }
  const { data, error } = await supabase.from('students').insert(payload).select().single()
  if (error) throw error
  return data
}

export const updateStudent = async ({ id, ...updates }) => {
  const payload = { ...updates, email: updates.email || null }
  const { data, error } = await supabase
    .from('students')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const deleteStudent = async (id) => {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) {
    if (error.code === '23503') throw new Error('El alumno tiene inscripciones o datos asociados.')
    throw error
  }
  return true
}

export const bulkCreateStudents = async (studentsArray) => {
  const payload = studentsArray.map((student) => ({
    ...student,
    email: student.email || null,
  }))

  const { data, error } = await supabase
    .from('students')
    .upsert(payload, {
      onConflict: 'dni',
      ignoreDuplicates: true,
    })
    .select()

  if (error) throw error

  const insertedDnis = new Set(data.map((s) => s.dni))
  const duplicatedStudents = studentsArray.filter((s) => !insertedDnis.has(s.dni))

  return {
    inserted: data,
    duplicates: duplicatedStudents,
  }
}
