'use server'

import { memberService } from '@/domains/member'

export async function getMemberMe() {
  return await memberService.getMemberMe()
}

export async function getMemberContact() {
  return await memberService.getMyContact()
}

export async function getMemberAvailableCoupons() {
  return await memberService.getMyAvailableCoupons()
}
