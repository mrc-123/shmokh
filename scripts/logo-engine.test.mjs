import test from 'node:test';
import assert from 'node:assert/strict';
import {logoConcept,createConceptSvg,previewSurface} from '../app/logo-engine.js';
const brief={name:'مدار',idea:'منصة تقنية تربط المصممين بالعملاء',primary:'#123456',secondary:'#abcdef',style:'geometric'};
test('Concepts are deterministic and respond to idea, colors, style and variation',()=>{
  assert.deepEqual(logoConcept(brief),logoConcept(brief));
  assert.equal(logoConcept(brief).category,'technology');
  assert.equal(logoConcept({...brief,idea:'حديقة ورود ونباتات'}).category,'nature');
  assert.equal(logoConcept({...brief,idea:'مكتب عمارة وتصميم منازل'}).category,'structure');
  assert.notEqual(logoConcept(brief).shape,logoConcept(brief,1).shape);
  assert.notEqual(logoConcept(brief).shape,logoConcept({...brief,style:'monogram'}).shape);
  assert.ok(logoConcept(brief).shape.includes('#123456'));
});
test('User text is escaped and invalid colors never become SVG markup',()=>{
  const concept=logoConcept({...brief,name:'<script>&"',idea:'<svg onload="alert(1)">',primary:'red" onload="bad'});
  const svg=createConceptSvg(concept,{card:true,signature:'<test>'});
  assert.equal(concept.primary,'#95ddd1');
  assert.ok(!svg.includes('<script>'));
  assert.ok(!svg.includes('<svg onload='));
  assert.ok(svg.includes('&lt;test&gt;'));
});
test('All idea families produce finite SVG and adapt preview contrast',()=>{
  for(const idea of ['تقنية وبرمجيات','زراعة نباتات','عقارات ومنازل','تصوير وفن']){
    for(const style of ['geometric','soft','monogram']){
      const svg=createConceptSvg(logoConcept({...brief,idea,style}));
      assert.ok(!svg.includes('NaN'));
      assert.ok(!svg.includes('undefined'));
      assert.ok(!svg.includes('<rect width="1200"'));
    }
  }
  assert.equal(previewSurface('#000000','#111111'),'#f0f1e9');
  assert.equal(previewSurface('#ffffff','#eeeeee'),'#102e32');
});
