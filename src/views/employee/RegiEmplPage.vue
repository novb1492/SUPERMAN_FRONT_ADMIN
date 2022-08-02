<template>
    <p style="margin-top: 70px;">
        fs
    
    </p>
</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('NavStore/changeSituation', 0);
    }
}
</script>

<style>

</style>