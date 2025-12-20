import { MemberGrade } from '@/types/api/rank'

// 멤버 등급을 한글 이름으로 변환
export const getMemberGradeDisplayName = (grade: MemberGrade): string => {
  const gradeMap: Record<MemberGrade, string> = {
    NEWCOMER: '신입멤버',
    ACTIVE: '열심멤버',
    INSIDER: '인싸멤버',
    GOURMET: '미식멤버',
    TEHA: '테하멤버',
  }
  return gradeMap[grade]
}

// 멤버 등급에 따른 아이콘 번호 반환
export const getMemberGradeIcon = (grade: MemberGrade): string => {
  const iconMap: Record<MemberGrade, string> = {
    NEWCOMER: '01',
    ACTIVE: '02',
    INSIDER: '03',
    GOURMET: '04',
    TEHA: '05',
  }
  return iconMap[grade]
}

// 멤버 등급에 따른 색상 반환
export const getMemberGradeColor = (grade: MemberGrade): string => {
  const colorMap: Record<MemberGrade, string> = {
    NEWCOMER: 'text-[#4a6db3]',
    ACTIVE: 'text-[#ed771f]',
    INSIDER: 'text-[#a5a5a5]',
    GOURMET: 'text-[#f4aa14]',
    TEHA: 'text-main',
  }
  return colorMap[grade]
}
