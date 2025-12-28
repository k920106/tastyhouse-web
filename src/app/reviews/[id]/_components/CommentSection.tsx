'use client'

import Avatar from '@/components/ui/Avatar'
import Nickname from '@/components/ui/Nickname'
import TimeAgo from '@/components/ui/TimeAgo'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { Comment } from '@/types/api/review'
import { useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { RxPaperPlane } from 'react-icons/rx'

export function CommentSectionSkeleton() {
  return (
    <div className="border-t border-[#eeeeee] box-border">
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-2.5">
              <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-[15px] mb-2.5">
                  <Skeleton className="h-[14px] w-[60px]" />
                  <Skeleton className="h-[12px] w-[40px]" />
                </div>
                <Skeleton className="h-[12px] w-full" />
                <Skeleton className="h-[12px] w-3/4 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CommentSectionProps {
  comments: Comment[]
}

export default function CommentSection({ comments }: CommentSectionProps) {
  const [commentText, setCommentText] = useState('')

  const handleSubmitComment = () => {
    // TODO: 댓글 등록 API 호출
    setCommentText('')
  }

  return (
    <>
      <div className="border-t border-[#eeeeee] box-border">
        <div className="px-[15px] py-5">
          {comments.length > 0 ? (
            <div className="space-y-[30px]">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div className="flex gap-2.5">
                    <Avatar src={comment.userProfileImage} alt={comment.userName} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[15px] mb-2.5">
                        <Nickname>{comment.userName}</Nickname>
                        <TimeAgo date={comment.createdAt} />
                      </div>
                      <p className="text-xs leading-relaxed">{comment.content}</p>
                      <button className="mt-[15px] text-xs leading-[12px] text-[#999999]">
                        답글달기
                      </button>
                    </div>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <button className="h-[18px] cursor-pointer flex-shrink-0">
                          <FiMoreVertical size={18} color="#999999" />
                        </button>
                      </DrawerTrigger>
                      <DrawerContent className="bg-transparent p-[15px] border-none">
                        <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
                        <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
                        <div className="text-center bg-white rounded-[14px]">
                          <DrawerClose asChild>
                            <button className="w-full py-[20.5px] text-sm leading-[14px]">
                              신고
                            </button>
                          </DrawerClose>
                          <div className="h-px bg-[#f6f6f6]" />
                          <DrawerClose asChild>
                            <button className="w-full py-[20.5px] text-sm leading-[14px]">
                              차단
                            </button>
                          </DrawerClose>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-[34px] mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2.5">
                          <Avatar src={reply.userProfileImage} alt={reply.userName} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2.5">
                              <Nickname size="sm">{reply.userName}</Nickname>
                              <TimeAgo date={reply.createdAt} />
                            </div>
                            <p className="text-xs leading-relaxed">{reply.content}</p>
                            <button className="mt-[15px] text-xs leading-[12px] text-[#999999]">
                              답글달기
                            </button>
                          </div>
                          <Drawer>
                            <DrawerTrigger asChild>
                              <button className="h-[18px] cursor-pointer flex-shrink-0">
                                <FiMoreVertical size={18} color="#999999" />
                              </button>
                            </DrawerTrigger>
                            <DrawerContent className="bg-transparent p-[15px] border-none">
                              <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
                              <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
                              <div className="text-center bg-white rounded-[14px]">
                                <DrawerClose asChild>
                                  <button className="w-full py-[20.5px] text-sm leading-[14px]">
                                    신고
                                  </button>
                                </DrawerClose>
                                <div className="h-px bg-[#f6f6f6]" />
                                <DrawerClose asChild>
                                  <button className="w-full py-[20.5px] text-sm leading-[14px]">
                                    차단
                                  </button>
                                </DrawerClose>
                              </div>
                            </DrawerContent>
                          </Drawer>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="text-sm leading-[14px] text-[#999999] text-center">
                아직 작성된 댓글이 없어요.
              </p>
              <p className="text-sm leading-[14px] text-[#999999] text-center">
                첫 댓글을 남겨보세요!
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] box-border">
        <div className="flex items-center gap-[17px] px-[15px] py-[15px]">
          <div className="flex-1 flex items-center gap-[7px]">
            <Avatar src={null} alt="내 프로필" />
            <div className="flex-1 px-4 py-2.5 border border-[#eeeeee] box-border rounded-[20px]">
              <textarea
                rows={1}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="댓글을 입력하세요."
                className="w-full text-sm leading-[14px] bg-transparent outline-none resize-none overflow-y-hidden placeholder:text-[#aaaaaa] [field-sizing:content]"
              />
            </div>
          </div>
          {commentText.trim() && (
            <button
              className="flex justify-end items-center w-[22px] h-[44px]"
              onClick={handleSubmitComment}
            >
              <RxPaperPlane size={22} color="#cccccc" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
