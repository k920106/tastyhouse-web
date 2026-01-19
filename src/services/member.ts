'use server'

import { memberService } from '@/domains/member'

export async function getMemberMe() {
  return await memberService.getMemberMe()
}
