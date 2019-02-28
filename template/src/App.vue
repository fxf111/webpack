<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view/>
    {{else}}
    <Show/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import Show from './components/views/Show/Show.vue'

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    Show
  }{{/router}}
}
</script>

<style>

</style>
