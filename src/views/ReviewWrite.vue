<template>
  <div>
    <dd-form
    :data="exampleDataSet"
    :descriptions="exampleDescriptions"
    @submit="submit">
</dd-form>
  </div>
</template>

<script>
import ddForm from 'vue-dd-form';
export default {
  name:'ReviewWrite',
  data: function () {
    return {
      exampleDataSet: {},
      exampleDescriptions: {
        "title": {
        "view": "text",
        "label": "Review title"
        },
        "description": {
        "view": "area",
        "label": "Content"
        },
        "education": {
        "view": "group",
        "label": "이 영화가 재밌었나요?"
    },
    "education.status": {
        "view": "radio",
        "label": "",
        "defaultValue": "true",
        "options": [
            {
                "text": "영화 개꿀잼입니다 ㄹㅇ루",
                "value": "true"
            },
            {
                "text": "전 별로에요.",
                "value": "false"
            },
        ]
    },
  }
    }
  },
  components: {
    ddForm,
  }
}
</script>

<style>

</style>
