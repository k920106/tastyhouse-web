'use server'

import { memberService } from '@/domains/member'

export async function getMemberMe() {
  return await memberService.getMemberMe()
}

export async function getMyReviewStats() {
  return await memberService.getMyReviewStats()
}

export async function getMemberAvailableCoupons() {
  return await memberService.getMyAvailableCoupons()
}

export async function getMemberUsablePoint() {
  return await memberService.getMyUsablePoint()
}

export async function getMyReviews(page: number = 0, size: number = 9) {
  return await memberService.getMyReviews(page, size)
}

export async function getMyBookmarks(page: number = 0, size: number = 10) {
  return await memberService.getMyBookmarks(page, size)
}
