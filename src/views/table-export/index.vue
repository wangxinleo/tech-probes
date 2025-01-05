<template>
  <div>
    <button @click="exportToDocx">导出表格到Docx</button> <!-- 按钮用于触发导出功能 -->
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>邮箱</th>
          <th>电话</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in tableData" :key="index">
          <td v-if="index === 0 || data.name !== tableData[index - 1].name" :rowspan="tableData.filter(d => d.name === data.name).length">
            {{ data.name }}
          </td>
          <td>{{ data.email }}</td>
          <td>{{ data.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue' // 从vue中导入ref，用于响应式数据
import { faker } from '@faker-js/faker' // 导入faker模块，用于生成假数据
import { saveAs } from 'file-saver' // 导入file-saver模块，用于保存文件
import PizZip from 'pizzip' // 导入pizzip模块，用于处理zip文件
import Docxtemplater from 'docxtemplater' // 导入docxtemplater模块，用于模板替换

// 生成一个对象数组，长度不固定
const names = Array.from({ length: 3 }, () => faker.person.fullName()) // 生成三个随机姓名
const tableData = ref(Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => ({
  name: names[faker.number.int({ min: 0, max: 2 })], // 随机选择一个姓名
  email: faker.internet.email(), // 生成随机邮箱
  phone: faker.phone.number(), // 生成随机电话号码
})).sort((a, b) => a.name.localeCompare(b.name))) // 按姓名排序

// 导出表格到docx文件
const exportToDocx = () => {
  // 创建表格数据
  const table = tableData.value.map((data, index) => {
    // 检查当前数据是否是第一个出现的该姓名
    const isFirstOccurrence = index === 0 || data.name !== tableData.value[index - 1].name
    return {
      name: isFirstOccurrence ? data.name : '', // 如果是第一次出现则显示姓名，否则为空
      email: data.email, // 邮箱
      phone: data.phone, // 电话
      rowSpan: isFirstOccurrence ? tableData.value.filter(d => d.name === data.name).length : 1 // 如果是第一次出现则计算合并行数
    }
  })

  console.log(table)
  const table02 = tableData.value.reduce((acc, data) => {
    // 查找是否已经存在该姓名的对象
    let existing = acc.find(item => item.name === data.name)
    if (existing) {
      // 如果存在，则将email和phone添加到list中
      existing.list.push({ email: data.email, phone: data.phone })
    } else {
      // 如果不存在，则创建一个新的对象并添加到acc中
      acc.push({ name: data.name, list: [{ email: data.email, phone: data.phone }] })
    }
    return acc
  }, [])

  console.log(table02)

  // 读取模板文件并替换
  fetch('/table-export-template.docx')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const zip = new PizZip(buffer)
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      })

      // 使用setData方法替换模板中的{table02}占位符
      doc.setData({
        table01: table, // 将table对象传入
        table02: table02, // 将table02对象传入
      })

      try {
        doc.render() // 渲染文档
      } catch (error) {
        console.error('Error rendering document:', error) // 捕获渲染错误
      }

      const out = doc.getZip().generate({
        type: 'blob', // 生成blob类型
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // 设置MIME类型
      })

      saveAs(out, 'Table.docx') // 保存为Table.docx文件
    })
    .catch(error => {
      console.error('Error fetching template:', error) // 捕获获取模板错误
    })
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

td {
  vertical-align: top;
}
</style>