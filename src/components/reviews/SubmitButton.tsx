interface SubmitButtonProps {
  form: {
    placeName?: string
    menuName?: string
    content: string
    photos: File[]
    tags: string[]
  }
  disabled?: boolean
}

export default function SubmitButton({ form, disabled = false }: SubmitButtonProps) {
  console.log(form, disabled)
  return <div></div>
  // const handleSubmit = async () => {
  //   if (!form.placeName) {
  //     toast('상호명은 필수 입력 사항입니다.')
  //     return
  //   }
  //   if (!form.content) {
  //     toast('내용은 필수 입력 사항입니다.')
  //     return
  //   }
  //   try {
  //     const data = {
  //       placeName: form.placeName,
  //       menuName: form.menuName,
  //       content: form.content,
  //       photos: form.photos,
  //       tags: form.tags,
  //     }
  //     await api.post('/reviews', data)
  //     toast('리뷰가 등록되었습니다.')
  //   } catch (error) {
  //     console.error('리뷰 등록 실패:', error)
  //     toast('리뷰 등록에 실패했습니다.')
  //   }
  // }
  // return (
  //   <button
  //     className={`w-full py-3 text-base leading-[16px] ${
  //       disabled
  //         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
  //         : 'bg-main text-white cursor-pointer'
  //     }`}
  //     onClick={handleSubmit}
  //     disabled={disabled}
  //   >
  //     등록하기
  //   </button>
  // )
}
