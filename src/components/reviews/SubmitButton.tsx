import { ApiClient } from '@/lib/api-client'

interface SubmitButtonProps {
  form: {
    placeName: string
    menuName: string
    content: string
    photos: File[]
    tags: string[]
  }
}

export default function SubmitButton({ form }: SubmitButtonProps) {
  const handleSubmit = async () => {
    if (!form.placeName) {
      alert('상호명은 필수 입력 사항입니다.')
      return
    }

    if (!form.content) {
      alert('내용은 필수 입력 사항입니다.')
      return
    }

    try {
      const data = {
        placeName: form.placeName,
        menuName: form.menuName,
        content: form.content,
        photos: form.photos,
        tags: form.tags,
      }

      await ApiClient.post('/reviews', data)
      alert('리뷰가 등록되었습니다.')
    } catch (error) {
      console.error('리뷰 등록 실패:', error)
      alert('리뷰 등록에 실패했습니다.')
    }
  }
  return (
    <button className="w-full bg-main text-white py-3 text-base" onClick={handleSubmit}>
      등록하기
    </button>
  )
}
