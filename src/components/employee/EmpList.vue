<template lang="">
    <li>
        <p>이름:{{info.name}}</p>
        <p>전화번호:{{ info.phone }}</p>
        <p>이메일:{{ info.email }}</p>
        <p>권한:{{ info.role}}</p>
    </li>
</template>
<script>
export default {
    props: ['info']
}
</script>
<style lang="">
    
</style>