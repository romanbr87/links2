  
  useEffect(() => {
    Array.prototype.groupBy = function(key) {
      return this.reduce(function (r, a, i) {

          if (a.facebook_link2 == undefined) a.facebook_link2 = "";
          if (a.facebook_link3 == undefined) a.facebook_link3 = [];
          if (a.instagram_link == undefined) a.instagram_link = "";
          if (a.location == undefined) a.location = "";

          var b = {
            site_name: a.site_name,
            link: a.link,
            link2: a.link2,
            facebook_link1: a.facebook_link1,
            facebook_link2: a.facebook_link2,
            facebook_link3: a.facebook_link3,
            linkedIn_link: a.linkedIn_link,
            linkedIn_link: a.linkedIn_link,
            email1: a.email1,
            email2: a.email2,
            tel1: a.tel1,
            tel2: a.tel2,
            whatsapp: a.whatsapp,
            location: a.location
          }

          if (a.border != undefined) b.border = a.border;

          if (!i || b[key] != undefined) {
            var cat = b.border
            delete b.border  
            return r.concat({cat: cat, links: [b]});
          }
          r[r.length - 1].links.push(b);
          return r;
      }, []);
    };

    Array.prototype.groupBy1 = function(key) {
      var arr = this.groupBy (key)
      for (var i = 0; i < arr.length; i++) {
        arr[i] = { cat: arr[i][0].border, links: arr[i] }
        delete arr[i].links[0].border
      }
      return arr;
    }
    
    const setJSON = (arr) => {
      return { job: arr.map (e => {
        var desc = (e.desc == undefined) ? '' : e.desc;
        var obj = { name: e.name, desc: desc, links: e.links.groupBy("border") }
        return obj;
      }) }
    }
    
    console.log (setJSON(data)); 
})
