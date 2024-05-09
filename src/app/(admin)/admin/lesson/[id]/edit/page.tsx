'use client'

import Divider from '@/components/Divider'
import AdminHeader from '@/components/admin/AdminHeader'
import { ICourse } from '@/models/CourseModel'

export type GroupCourses = {
  [key: string]: ICourse[]
}

function EditLessonPage() {
  return (
    <div className='max-w-1200 mx-auto'>
      {/* MARK: Admin Header */}
      <AdminHeader title='Add Lesson' backLink='/admin/lesson/all' />

      <Divider size={2} />
    </div>
  )
}

export default EditLessonPage
