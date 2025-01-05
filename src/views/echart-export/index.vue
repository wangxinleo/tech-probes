<template>
    <div>
        <div>
            <button @click="exportWord">导出 Word 文档</button>
        </div>
        <div>
            <Echarts v-if="options01" ref="echartsRef01" :options="options01"></Echarts>
            <Echarts v-if="options02" ref="echartsRef02" :options="options02"></Echarts>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import docxtemplater from 'docxtemplater';
  import PizZip from 'pizzip';
  import { saveAs } from 'file-saver';
  import html2canvas from 'html2canvas';
  import Echarts from '@/views/echart-export/components/export.vue';
  import ImageModule from 'docxtemplater-image-module-free';
  import { faker } from '@faker-js/faker';
  
  // 生成随机的 Echarts 图表选项
  const generateRandomOptions = () => ({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: Array.from({ length: 7 }, () => faker.number.int({ min: 100, max: 300 })),
        type: 'line',
      },
    ],
  });
  
  const options01 = ref(null);
  const options02 = ref(null);

  const echartsRef01 = ref(null);
  const echartsRef02 = ref(null);
  
  // 在组件挂载时生成选项
  onMounted(() => {
    options01.value = generateRandomOptions();
    options02.value = generateRandomOptions();
  });
  
  // 将 base64 数据 URL 转换为 ArrayBuffer
  const base64DataURLToArrayBuffer = (dataURL) => {
    const base64Regex = /^data:image\/(png|jpg|jpeg|svg|svg\+xml);base64,/;
    if (!base64Regex.test(dataURL)) return false;
    const stringBase64 = dataURL.replace(base64Regex, "");
    const binaryString = typeof window !== "undefined" ? window.atob(stringBase64) : Buffer.from(stringBase64, "base64").toString("binary");
    return Uint8Array.from(binaryString, char => char.charCodeAt(0)).buffer;
  };
  
  // 导出 Word 文档
  const exportWord = async () => {
    try {

      const [canvas01, canvas02] = await Promise.all([
        html2canvas(echartsRef01.value.$refs.echartsRef),
        html2canvas(echartsRef02.value.$refs.echartsRef),
      ]);

      const imgDataDict = {
        echartsImage01: base64DataURLToArrayBuffer(canvas01.toDataURL('image/png')),
        echartsImage02: base64DataURLToArrayBuffer(canvas02.toDataURL('image/png')),
      };

      const docxData = await fetch('/echart-export-template.docx');
      const docxArrayBuffer = await docxData.arrayBuffer();
      const zip = new PizZip(docxArrayBuffer);
      const doc = new docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        modules: [
          new ImageModule({
            getImage: (value, key) => imgDataDict[key],
            getSize: () => [400, 400],
          }),
        ],
      });

      doc.setData({
        echartsImage01: "echartsImage01",
        echartsImage02: "echartsImage02",
        txt01: 'Hello World!',
        txt02: 'Hello World! 2',
      });

      doc.render();
      const blob = doc.getZip().generate({
        type: 'blob',
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(blob, 'output.docx');
    } catch (error) {
      console.error('导出文档时出错:', error);
    }
  };
  </script>
  