<template>
  <backTop />
</template>
<script setup lang="tsx">
import { useWindowScroll } from "@vueuse/core";
interface IProps {
  offsetTop?: number;
}
const props = defineProps<IProps>();

const { offsetTop } = toRefs(props);
const offsetTopVal = offsetTop.value ?? 400;

const slots = useSlots();

const { y } = useWindowScroll();

function callBackTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const backTop = () => {
  let newClass = `n-backTop-base ${y.value > offsetTopVal ? "" : "hidden"}`;
  return (
    <div class={newClass} onClick={callBackTop}>
      {slots.default()}
    </div>
  );
};
</script>