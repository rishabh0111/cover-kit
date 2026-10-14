// Regenerate styles/brand-icons.js, the logo bundle for the "stack" cover style.
//   node build-brand-icons.js
// Needs the devicon and simple-icons packages (npm i, from package.json). To add a logo,
// add a line to L below: [source "dv" (Devicon file) | "si" (Simple Icons slug), file or
// slug, title, glow colour]. Prefer Devicon "original" files: they are full colour.
const fs=require("fs"), si=require("simple-icons");
const path=require("path"); process.chdir(__dirname);
const DV="node_modules/devicon/icons";
// key: [source, file-or-slug, title, glow hex, optional fill for a mark drawn without one]
const L={
 go:["dv","go/go-original.svg","Go","#00ADD8"],
 graphql:["dv","graphql/graphql-plain.svg","GraphQL","#E10098"],
 docker:["dv","docker/docker-original.svg","Docker","#2496ED"],
 githubactions:["dv","githubactions/githubactions-original.svg","GitHub Actions","#2088FF"],
 terraform:["dv","terraform/terraform-original.svg","Terraform","#844FBA"],
 argocd:["dv","argocd/argocd-original.svg","Argo CD","#EF7B4D"],
 kubernetes:["dv","kubernetes/kubernetes-original.svg","Kubernetes","#326CE5"],
 helm:["dv","helm/helm-original.svg","Helm","#5B6BFF"],
 aws:["dv","amazonwebservices/amazonwebservices-original-wordmark.svg","AWS","#FF9900"],
 dynamodb:["dv","dynamodb/dynamodb-original.svg","DynamoDB","#527FFF"],
 k3s:["dv","k3s/k3s-original.svg","k3s","#FFC61C"],
 traefik:["dv","traefikproxy/traefikproxy-original.svg","Traefik","#24A1C1"],
 prometheus:["dv","prometheus/prometheus-original.svg","Prometheus","#E6522C"],
 grafana:["dv","grafana/grafana-original.svg","Grafana","#F46800"],
 k6:["dv","k6/k6-original.svg","k6","#7D64FF"],
 trivy:["si","trivy","Trivy","#5B6CFF"],
 java:["dv","java/java-original.svg","Java","#ED8B00"],
 springboot:["si","springboot","Spring Boot","#6DB33F"],
 hibernate:["dv","hibernate/hibernate-original.svg","Hibernate","#BCAE79"],
 maven:["dv","maven/maven-original.svg","Maven","#C71A36"],
 kafka:["dv","apachekafka/apachekafka-original.svg","Kafka","#9AA4B2"],
 grpc:["dv","grpc/grpc-plain.svg","gRPC","#244C5A","#244C5A"],
 postgresql:["dv","postgresql/postgresql-original.svg","PostgreSQL","#4169E1"],
 redis:["dv","redis/redis-original.svg","Redis","#DC382D"],
 junit:["si","junit5","JUnit 5","#25A162"],
 gatling:["dv","gatling/gatling-original.svg","Gatling","#FF9E2A"],
};
const by=Object.fromEntries(Object.values(si).filter(x=>x&&x.slug).map(x=>[x.slug,x]));
const out={};
for(const [k,[src,f,title,glow,fill]] of Object.entries(L)){
  let svg;
  if(src==="dv"){ svg=fs.readFileSync(`${DV}/${f}`,"utf8").replace(/<\?xml[^>]*>/,"").replace(/<!--[\s\S]*?-->/g,"").trim(); }
  else { const i=by[f]; svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${i.hex}" d="${i.path}"/></svg>`; }
  // the original gRPC mark is white lettering, invisible on a white tile; the plain one has no fill
  if(fill) svg=svg.replace("<svg ",`<svg fill="${fill}" `);
  // namespace ids so gradients from different logos never collide in one document
  const ids=[...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  for(const id of ids){ const n=`${k}-${id}`;
    svg=svg.split(`id="${id}"`).join(`id="${n}"`).split(`url(#${id})`).join(`url(#${n})`).split(`href="#${id}"`).join(`href="#${n}"`); }
  if(!/viewBox=/.test(svg)) throw new Error(k+": no viewBox");
  out[k]={title,glow,svg:svg.replace(/\s+/g," ")};
}
const hdr=`/* Brand logos for the "stack" cover style: window.BRANDS[key] = {title, glow, svg}.
   Generated, not hand-edited. Sources: Devicon ${JSON.parse(fs.readFileSync("node_modules/devicon/package.json")).version}
   (MIT, full-colour "original" marks) and Simple Icons ${JSON.parse(fs.readFileSync("node_modules/simple-icons/package.json")).version} (CC0;
   used for Trivy, Spring Boot and JUnit 5, where Devicon lacks a mark or has only the family one). There is no EKS mark in either: Amazon had its
   logos removed from Simple Icons, so EKS is drawn with Devicon's AWS wordmark. The logos
   are trademarks of their owners, used here only to name the technologies a post covers.
   Element ids are prefixed with the key so gradients from different logos never collide. */\n`;
fs.writeFileSync("styles/brand-icons.js", hdr+"window.BRANDS="+JSON.stringify(out,null,0).replace(/\},"/g,'},\n"')+";\n");
console.log(Object.keys(out).length,"logos", (fs.statSync("styles/brand-icons.js").size/1024).toFixed(0)+" KB");
