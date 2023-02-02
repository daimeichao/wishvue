<template>
  <section class="app-main" style="max-height: 90%;">
    <transition name="fade" mode="out-in">
      <router-view :key="key" @detailName="detailName" @returnUrl="returnUrl"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  methods: {
    detailName (data) {
      this.$emit('detailName', data)

    },
    returnUrl (data) {
      this.$emit('returnUrl', data)
    }
  }
}
</script>
