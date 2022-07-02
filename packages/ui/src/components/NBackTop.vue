<template>
    <backTop/>
</template>
<script setup lang="tsx">
import { useWindowScroll } from '@vueuse/core'
interface IProps {
  offsetTop?: number
}
const props = defineProps<IProps>()
const { offsetTop } = toRefs(props);
const offsetTopVal = offsetTop.value ?? 400

const { y } = useWindowScroll()

function callBackTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const backTop = ()=>{
    let newClass = `fixed right-[40px] bottom-[40px] cursor-pointer ${y.value > offsetTopVal ? '' : 'hidden'}`
    return <div class={newClass} onClick={callBackTop}>
        <div class="rounded p-2 bg-blue text-white">UP</div>
    </div>
}

</script>