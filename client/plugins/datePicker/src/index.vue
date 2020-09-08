<!--test.vue-->
<template>
  <div class="qk-date">
    <van-calendar v-model="show" @confirm="onConfirm" />
  </div>
</template>

<script>
  import vueobj from '@client/common/js/vueobj.js'
	export default {
		name: 'QkDate',
		data() {
			return {
				date: '',
        show: false,
			}
        },
        mounted(){
          vueobj.$on('datepickershow',()=>{
            this.show = true;
          })
        },
        methods:{
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            onConfirm(date) {
                this.show = false;
                this.date = this.formatDate(date);
                console.log(this.date)
                vueobj.$emit('datePickerVal',this.date);
            }
        }
	}
</script>

<style lang="scss" scoped>

</style>
