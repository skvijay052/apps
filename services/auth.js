import { supabase } from '../config/supabase'

export async function sendOTP(phone) {
  return await supabase.auth.signInWithOtp({
    phone: `+91${phone}`
  })
}

export async function verifyOTP(phone, code) {
  return await supabase.auth.verifyOtp({
    phone: `+91${phone}`,
    token: code,
    type: 'sms'
  })
}


export async function saveUser(profile) {
  const user = (await supabase.auth.getUser()).data.user

  return await supabase.from("users").insert([
    {
      id: user.id,
      name: profile.name,
      phone: profile.phone,
      gender: profile.gender
    }
  ])
}