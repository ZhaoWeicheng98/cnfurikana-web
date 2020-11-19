<template>
  <div class="furikana">
    <p v-html="displayContent"></p>
  </div>
</template>

<script>
import "../utils/furikana.js";
import { ToHtmlContent, ToParsedContent } from "../utils/furikana.js";
export default {
  name: "FurikanaDisplay",
  props: {
    content: String,
    displayMode: Number
  },
  computed: {
    displayContent: function() {
      return ToHtmlContent(ToParsedContent(this.content), this.displayMode);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  font-size: 48px;
  text-align: center;
}

ruby {
  size: 24px;
}
</style>
