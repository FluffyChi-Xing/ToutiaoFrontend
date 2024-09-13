<script setup lang="ts">
import { ref } from 'vue'
import {$message} from "@/componsables/element-plus";
import { useRouter } from "vue-router";
import {$api} from "@/componsables/api";


const swiperList = [
    'src/assets/img/login-sw-1.png',
    'src/assets/img/login-sw-2.png',
    'src/assets/img/login-sw-3.png',
]


const router = useRouter()
/** ===== 登录表单-start ===== **/
const username = ref<string>()
const password = ref<string>()
const pass = ref<string>()


async function LoginIn(username: string, password: string) {
  await $api.LoginIn(username, password).then((res: any) => {
    console.log(res)
    if (res.data.code !== 200) {
      $message({
        type: "warning",
        message: res.data.errorMessage
      })
    } else {
      $message({
        type: "success",
        message: "登录成功"
      })
      router.push('/')
      storgeToken(res.data.data.token)
    }
  });
}

function storgeToken(item: string) {
  localStorage.setItem('token', item)
}

async function handleLogin() {
  if (!username.value || !password.value) {
    $message({
      type: "warning",
      message: "用户名或密码错误"
    })
  } else if (pass.value !== password.value) {
    $message({
      type: "warning",
      message: "两次密码不一致"
    })
  } else {
    await LoginIn(username.value, password.value)
  }
}
/** ===== 登录表单-end ===== **/
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center login-bg overflow-hidden">
    <div class="w-[600px] h-[400px] flex">
      <el-card
          class="w-full h-full"
      >
        <div class="w-full h-full grid grid-cols-2">
          <!-- swiper -->
          <div class="w-full h-full flex flex-col">
            <el-carousel
                class="w-full h-full"
                indicator-position="none"
                autoplay
                loop
                interval="5000"
                height="398"
            >
              <el-carousel-item
                  v-for="item in swiperList"
                  :key="item"
                  class="w-full h-full"
              >
                <img :src="item" alt="" loading="lazy" class="w-full h-full flex object-contain">
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- login form -->
          <div class="w-full h-full flex flex-col p-4 justify-center items-center">
            <el-form
                label-width="auto"
            >
              <el-form-item>
                <div class="w-full h-16 login-logo" />
              </el-form-item>
              <el-form-item
                  label="用户名"
                  required
              >
                <el-input
                    v-model="username"
                    placeholder="请输入用户名"
                    prefix-icon="User"
                    clearable
                />
              </el-form-item>
              <el-form-item
                  label="密码"
                  required
              >
                <el-input
                    v-model="password"
                    placeholder="请输入密码"
                    prefix-icon="Lock"
                    clearable
                    maxlength="11"
                    type="password"
                    show-word-limit
                    show-password
                />
              </el-form-item>
              <el-form-item
                  label="确认密码"
                  required
              >
                <el-input
                    v-model="pass"
                    placeholder="请再次输入密码"
                    clearable
                    prefix-icon="Lock"
                    type="password"
                    show-password
                    maxlength="11"
                    show-word-limit
                />
              </el-form-item>
              <el-form-item>
                <el-button
                    @click="handleLogin"
                    class="primary-success-btn w-full"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/css/element-edit";
.login-logo {
  background-image: url("@/assets/img/logo_heima_admin@2x.efa65eb.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 50px;
}
.login-bg {
  background-image: url("@/assets/img/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
:deep(.el-card__body) {
  padding: 0;
  width: 100%;
  height: 100%;
}
:deep(.el-carousel__container) {
  width: 100%;
  height: 100%;
}
</style>
