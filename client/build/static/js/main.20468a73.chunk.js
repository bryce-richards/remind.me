(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{44:function(e,t,a){e.exports=a(72)},72:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(20),c=a.n(l),i=a(2),u=a(11),o=a(40),s=a(4),m=a(12),d=function(){var e=Object(i.c)((function(e){return e.auth.token}));return r.a.createElement("div",{className:"navbar-fixed"},r.a.createElement("nav",null,r.a.createElement("div",{className:"nav-wrapper"},r.a.createElement(s.b,{className:"brand-logo left",style:{marginLeft:"24px"},to:e?"/dashboard":"/"},"Remind.me"),r.a.createElement("ul",{className:"right",style:{marginRight:"24px"}},e?r.a.createElement("div",null,r.a.createElement("li",null,r.a.createElement(s.b,{to:"/reminders/new"},"New Reminder")),r.a.createElement("li",null,r.a.createElement(s.b,{to:"/signout"},"Sign Out"))):r.a.createElement("div",null,r.a.createElement("li",null,r.a.createElement(s.b,{to:"/signup"},"Sign Up")),r.a.createElement("li",null,r.a.createElement(s.b,{to:"/signin"},"Sign In")))))))},p=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Remind.me"),"Keep track of what matters most.")},f=function(e){return Object(m.f)((function(t){var a=Object(i.c)((function(e){return e.auth.token})),l=Object(m.e)();return Object(n.useEffect)((function(){a||l.push("/")})),r.a.createElement(e,t)}))},b=a(19),v=a(23),E=a.n(v),h=a(8),y=a.n(h),g=a(13),w=a(14),O=a.n(w),j=function(){return localStorage.getItem("token")},x=function(e){var t=e.reminder,a=Object(i.b)(),l=t.text,c=E()(t.due).format("YYYY-MM-DD"),u=E()(t.due).format("HH:mm"),o=Object(n.useState)(!1),s=Object(b.a)(o,2),m=s[0],d=s[1],p=Object(n.useState)(l),f=Object(b.a)(p,2),v=f[0],h=f[1],w=Object(n.useState)(c),x=Object(b.a)(w,2),N=x[0],k=x[1],S=Object(n.useState)(u),R=Object(b.a)(S,2),_=R[0],C=R[1];return r.a.createElement("div",null,m?r.a.createElement("div",null,r.a.createElement("input",{type:"text",value:v,onChange:function(e){return h(e.target.value)}}),r.a.createElement("input",{type:"date",value:N,onChange:function(e){return k(e.target.value)}}),r.a.createElement("input",{type:"time",value:_,onChange:function(e){return C(e.target.value)}}),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:function(){var e={id:t._id,text:v,date:N,time:_};a(function(e){return function(){var t=Object(g.a)(y.a.mark((function t(a){var n;return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O.a.put("/api/reminders",e,{headers:{authorization:j()}});case 3:n=t.sent,a({type:"reminder/updated",payload:n.data}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),a({type:"error/received",payload:"Could not update reminder"});case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()}(e)),d(!1)},disabled:!v||!N||!_},r.a.createElement("i",{className:"material-icons"},"save")),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:function(){h(l),k(c),C(u),d(!1)},disabled:!v||!N||!_},r.a.createElement("i",{className:"material-icons"},"cancel"))):r.a.createElement("div",null,r.a.createElement("h5",{className:"title"},t.text),r.a.createElement("p",null,function(e){return E()(e).format("dddd, MMMM Do YYYY, h:mm A")}(t.due)),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:function(){d(!0)}},r.a.createElement("i",{className:"material-icons"},"edit")),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:function(){var e;a((e=t._id,function(){var t=Object(g.a)(y.a.mark((function t(a){return y.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O.a.delete("/api/reminders",{params:{id:e},headers:{authorization:j()}});case 3:t.sent,a({type:"reminder/deleted",payload:e}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),a({type:"error/received",payload:"Could not delete reminder"});case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()))}},r.a.createElement("i",{className:"material-icons"},"delete_forever"))))},N=function(){var e=Object(i.c)((function(e){return e.reminders})),t=Object(i.c)((function(e){return e.auth.firstName})),a=r.a.createElement(s.b,{className:"waves-effect waves-light btn",to:"/reminders/new"},"New Reminder");return r.a.createElement("div",null,e.length?r.a.createElement("div",null,r.a.createElement("h4",null,t?"".concat(t,"'s Reminders"):""),r.a.createElement("ul",{className:"collection"},e.map((function(e){return r.a.createElement("li",{key:e._id,className:"collection-item"},r.a.createElement(x,{reminder:e}))})))):r.a.createElement("div",null,r.a.createElement("h4",null,"Create your first reminder!"),a))},k=f((function(){var e=Object(i.b)();return Object(n.useEffect)((function(){e(function(){var e=Object(g.a)(y.a.mark((function e(t){var a;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.a.get("/api/reminders",{headers:{authorization:j()}});case 3:a=e.sent,t({type:"reminder/fetched",payload:a.data}),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t({type:"error/received",payload:"Could not fetch reminders"});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())})),r.a.createElement("div",{style:{margin:"0 auto 0 auto",width:"70%"}},r.a.createElement(N,null))})),S=a(5),R=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.toLowerCase())},_=function(){var e=Object(i.b)(),t=Object(m.e)();return r.a.createElement("div",{style:{margin:"0 auto 0 auto",width:"50%"}},r.a.createElement(S.b,{onSubmit:function(a){e(function(e,t){return function(){var a=Object(g.a)(y.a.mark((function a(n){var r;return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,O.a.post("/auth/signup",e);case 3:r=a.sent,n({type:"/user/signed_up",payload:r.data}),localStorage.setItem("token",r.data.token),t(),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),n({type:"error/received",payload:"User already exists"});case 12:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()}(a,(function(){t.push("/dashboard")})))},validate:function(e){var t,a={};return e.email?R(e.email)||(a.email="Not a valid email address"):a.email="Required",e.password||(a.password="Required"),e.confirm?e.confirm!==e.password&&(a.confirm="Password must match"):a.confirm="Required",e.phone?(t=e.phone,/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/.test(t)||(a.phone="Not a valid phone number")):a.phone="Required",a},render:function(e){var t=e.handleSubmit,a=e.form,n=e.submitting,l=e.pristine;return r.a.createElement("form",{onSubmit:t},r.a.createElement(S.a,{name:"firstName"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"First Name"),r.a.createElement("input",Object.assign({},t,{type:"text",placeholder:"First Name"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"email"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Email"),r.a.createElement("input",Object.assign({},t,{type:"text",placeholder:"Email"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"password"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Password"),r.a.createElement("input",Object.assign({},t,{type:"password",placeholder:"Password"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"confirm"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Confirm Password"),r.a.createElement("input",Object.assign({},t,{type:"password",placeholder:"Confirm"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"phone"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Phone (to receive SMS message)"),r.a.createElement("input",Object.assign({},t,{type:"tel",placeholder:"555-555-5555"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn",disabled:n},"Submit"),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:a.reset,disabled:n||l},"Reset")))}}))},C=function(){var e=Object(i.b)(),t=Object(m.e)();return r.a.createElement("div",{style:{margin:"0 auto 0 auto",width:"50%"}},r.a.createElement(S.b,{onSubmit:function(a){e(function(e,t){return function(){var a=Object(g.a)(y.a.mark((function a(n){var r;return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,O.a.post("/auth/signin",e);case 3:r=a.sent,n({type:"/user/signed_in",payload:r.data}),localStorage.setItem("token",r.data.token),t(),a.next=12;break;case 9:a.prev=9,a.t0=a.catch(0),n({type:"error/received",payload:"Invalid login"});case 12:case"end":return a.stop()}}),a,null,[[0,9]])})));return function(e){return a.apply(this,arguments)}}()}(a,(function(){t.push("/dashboard")})))},validate:function(e){var t={};return e.email?R(e.email)||(t.email="Not a valid email address"):t.email="Required",e.password||(t.password="Required"),t},render:function(e){var t=e.handleSubmit,a=e.form,n=e.submitting,l=e.pristine;return r.a.createElement("form",{onSubmit:t},r.a.createElement(S.a,{name:"email"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Email"),r.a.createElement("input",Object.assign({},t,{type:"text",placeholder:"Email"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"password"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Password"),r.a.createElement("input",Object.assign({},t,{type:"password",placeholder:"Password"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn",disabled:n},"Submit"),r.a.createElement("button",{type:"button",className:"waves-effect waves-light btn-flat",onClick:a.reset,disabled:n||l},"Reset")))}}))},q=function(){var e=Object(i.b)(),t=Object(m.e)();return Object(n.useEffect)((function(){var a;e((a=function(){t.push("/")},localStorage.removeItem("token"),a(),{type:"/user/signed_out",payload:""}))})),r.a.createElement("div",null,"See you next time!")},I=f((function(){var e=Object(i.b)(),t=Object(m.e)();return r.a.createElement("div",{style:{margin:"0 auto 0 auto",width:"70%"}},r.a.createElement(S.b,{onSubmit:function(a){e(function(e,t){return function(){var a=Object(g.a)(y.a.mark((function a(n){var r;return y.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,O.a.post("/api/reminders",e,{headers:{authorization:j()}});case 3:r=a.sent,n({type:"reminder/created",payload:r.data}),t(),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),n({type:"error/received",payload:"Could not create reminder"});case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}()}(a,(function(){t.push("/dashboard")})))},validate:function(e){var t={};return e.text||(t.text="Required"),e.date||(t.date="Required"),e.time||(t.time="Required"),t},render:function(e){var t=e.handleSubmit,a=e.submitting;return r.a.createElement("form",{onSubmit:t},r.a.createElement(S.a,{name:"text"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Reminder Text"),r.a.createElement("input",Object.assign({},t,{type:"text",placeholder:"Remember to..."})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"date"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Due Date"),r.a.createElement("input",Object.assign({},t,{type:"date"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement(S.a,{name:"time"},(function(e){var t=e.input,a=e.meta;return r.a.createElement("div",null,r.a.createElement("label",null,"Reminder Time"),r.a.createElement("input",Object.assign({},t,{type:"time"})),a.error&&a.touched&&r.a.createElement("span",null,a.error))})),r.a.createElement("div",{className:"buttons"},r.a.createElement("button",{type:"submit",className:"waves-effect waves-light btn",disabled:a},"Submit"),r.a.createElement(s.b,{className:"waves-effect waves-light btn-flat",to:"/dashboard"},"Cancel")))}}))})),M=function(){return r.a.createElement("div",null,r.a.createElement(s.a,null,r.a.createElement("nav",null,r.a.createElement(d,null)),r.a.createElement("main",{className:"container",style:{marginTop:"24px"}},r.a.createElement(m.a,{exact:!0,path:"/",component:p}),r.a.createElement(m.a,{exact:!0,path:"/dashboard",component:k}),r.a.createElement(m.a,{exact:!0,path:"/signup",component:_}),r.a.createElement(m.a,{exact:!0,path:"/signin",component:C}),r.a.createElement(m.a,{exact:!0,path:"/signout",component:q}),r.a.createElement(m.a,{exact:!0,path:"/reminders/new",component:I}))))},P=a(43),Y={token:"",error:"",firstName:""},D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"/user/signed_up":case"/user/signed_in":return{token:t.payload.token,error:"",firstName:t.payload.firstName};case"/user/signed_out":return{token:t.payload,error:"",firstName:""};case"error/received":return Object(P.a)({},e,{error:t.payload});default:return e}},z=a(42),T=a(15),B=a.n(T),A=[],L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"reminder/fetched":return B.a.sortBy(t.payload,["due"]);case"reminder/created":return B.a.sortBy([].concat(Object(z.a)(e),[t.payload]),["due"]);case"reminder/deleted":return B.a.orderBy(B.a.filter(e,(function(e){return e._id!==t.payload})),["due"]);case"reminder/updated":return B.a.sortBy(B.a.map(e,(function(e){return e._id===t.payload._id?t.payload:e})),["due"]);default:return e}},U=Object(u.c)({auth:D,reminders:L}),F=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||u.d,H=Object(u.e)(U,{auth:{token:localStorage.getItem("token")}},F(Object(u.a)(o.a)));c.a.render(r.a.createElement(i.a,{store:H},r.a.createElement(M,null)),document.querySelector("#root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.20468a73.chunk.js.map