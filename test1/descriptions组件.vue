<template>
  
  <a-descriptions title="User Info" layout="vertical" bordered>
    <a-descriptions-item label="Product">
      Cloud Database
    </a-descriptions-item>
    <a-descriptions-item label="Billing Mode">
      Prepaid
    </a-descriptions-item>
    <a-descriptions-item v-for="item in arr" :key="item.id"  :label="item.name">
      {{ item.val}}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script>

let arr = [  
 {
    id:1,
    name:['维度','可用额度%'],
  
      // val:["单日","单日足球","单日篮球"]
    val:[
      {a:'单日',b:'额度充足'},
      {a:'单日足球',b:'额度充足'},
      {a:'单日篮球',b:'5%'},

    ]

  },
]

</script>