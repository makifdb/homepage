---
title: Bir Miktar Üşengeçlik ve Tarayıcı Eklentisi Yazmaya Hızlı(102) Bir Giriş
description: Linux kullanırken yaşadığım bir sorunu ufak bir tarayıcı eklentisi yazarak çözüyorum.
date: 2021-02-24
image: images/ryoji-iwata-5siQcvSxCP8-unsplash.jpg
canonical: https://makifdb.medium.com/bir-miktar-%C3%BC%C5%9Fenge%C3%A7lik-ve-taray%C4%B1c%C4%B1-eklentisi-yazmaya-h%C4%B1zl%C4%B1-102-bir-giri%C5%9F-3599c5a1d0f2
---

## Problemle Karşılaşma

Yeni dönemin başlamasıyla beraber acaba bugün hangi derslerim var diyerek okulun internet sitesine girmiştim ki, uzun zamandır bildiğim ama sürekli erteleyip görmezden gelmeye çalıştığım bir problemle yüz yüze geldim.

Okulum dersleri Adobe Connect üzerinden canlı olarak işliyor. Bu yazılımın Windows ve Mac desteği olmasına rağmen malesef Linux desteği bulunmuyor ancak Flash kullanarak tarayıcı üzerinde de çalışabiliyordu. Bu nedenle daha önce benim için bir problem teşkil etmeyen bu durum 2021 yılının başında Flash’ın aramızdan ayrılmasıyla tekrardan ortaya çıktı.

{{< link "This blog page also available on Medium ⟶" "https://makifdb.medium.com/bir-miktar-%C3%BC%C5%9Fenge%C3%A7lik-ve-taray%C4%B1c%C4%B1-eklentisi-yazmaya-h%C4%B1zl%C4%B1-102-bir-giri%C5%9F-3599c5a1d0f2" >}}

![Photo by Ryoji Iwata on Unsplash](/images/ryoji-iwata-5siQcvSxCP8-unsplash.jpg "Photo by Ryoji Iwata on Unsplash")


## Çözüm Bulma

Bir süre bakındıktan sonra en kolay ve büyük ihtimalle en mantıklı çözümü buldum.

```text
https://classevirtuelle.ulaval.ca/system/get-player?urlPath=<urlPath>
```

Okul bizi yukardakine benzer bir URL’e yönlendiriyor. Biz ortadaki kısmı silip sonuna da “?proto=true” ekliyoruz.

```text
https://classevirtuelle.ulaval.ca/<urlPath>/?proto=true
```

Bu sayede Tarayıcımızda çalışan bir Adobe Connect’e erişebiliyoruz.

## Eklenti Yazmak

Sorunu nasıl çözeceğimi bulmuş olsam da her seferinde bunu elle yapmak bir süre sonra işkenceye dönüşecekti. Bunu benim yerime yapması için bir eklenti yazmaya karar verdim.

Bir eklentide bulunması gereken en önemli dosya manifest.json dosyasıdır. Bu yüzden ilk olarak onunla başladım.

```json
{
  "name": "Adobe Connect Linux",
  "description": "Adobe Connect browser support for Linux",
  "version": "1.0",
  "manifest_version": 3,
  "content_scripts": [
    {
      "matches": ["http://*/system/get-player?urlPath=/*"],
      "js": ["main.js"]
    }
  ]
}
```

Burada önemli olan kısım content_script kısmı. Eğer tarayıcıda açılan herhangi bir url de “/system/get-player?urlPath=/” içeren bir kısım varsa main.js dosyasını açılan sayfada çalıştırmamızı sağlıyor.

Test ettiğimde tam da istediğim gibi çalıştığını gördüm. Şimdi yapmam gereken JavaScript kısmını yazmaktı.

```js
var tablink = window.location.href;
```

İlk olarak içinde bulunduğumuz sayfanın URL’ini alıyoruz.

```js
var [aa, ab, domain] = tablink.split('/');
var [a, room] = tablink.split('=/');
```

Daha sonra URL’in istediğim kısımlarını splint fonksiyonu kullanarak alıyorum.

```js
window.open(`http://${domain}/${room}?proto=true`, '_self');
```

Son olarak da elimdeki parçaları bir araya getirerek yeni URL’i oluşturuyorum ve aktif olan sekmede açıyorum.

```js
var tablink = window.location.href;
var [aa, ab, domain] = tablink.split('/');
var [a, room] = tablink.split('=/');
window.open(`http://${domain}/${room}?proto=true`, '_self');
```

Son hali yukarıdaki gibi olan dosyayı da tamamlayınca eklenti artık kullanılabilir hale gelmiş oldu. Böylece ben ne zaman ders linkime tıklasam bu basit eklenti beni isteğim linke yönlendiriyor.

{{< link "Github Repo" "https://github.com/makifdb/adobeconnect-linux">}}