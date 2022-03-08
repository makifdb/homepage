---
title: Raspberry Pi üzerinde Zoom, Go, Vim, Visual Studio Code ve Minecraft
date: 2021-01-25T08:03:14+03:00
draft: false
canonical: https://makifdb.medium.com/raspberry-pi-%C3%BCzerinde-zoom-go-vim-visual-studio-code-ve-minecraft-691254c9a918
---

2016 yılında kendime bir adet Raspberry Pi 3 alıp bir süre kurcaladıktan sonra tozlu raflara kaldırmıştım ki Raspberry Pi’m [Adem](https://twitter.com/AdemOzcanTR)’in attığı twitle aklıma geldi. Ben de hem bir haftasonu aktivitesi olsun hem de Raspberry Pi’da ne gibi geliştirmeler-değişiklikler olmuş acaba diye merak edip tozlu raflardaki yerinden çıkartmaya karar verdim.

{{< link "This blog page also available on Medium ⟶" "https://makifdb.medium.com/raspberry-pi-%C3%BCzerinde-zoom-go-vim-visual-studio-code-ve-minecraft-691254c9a918" >}}

## Ölüyü Diriltmek

Raspberry Pi’a güç verip çalıştırdığımda beni Pixel arayüzü karşıladı. Uzunca bir süre internete bağlamadığım rpi’a boyutu büyük bir güncelleme gelmesini bekliyordum. Hemen wifi a bağlanmak istedim ama rpi3'e tümleşik gelen wifi adatörü yalnızca 2.4 ghz ağları desteklediği için ev ağımı listede göremeyince ondan vazgeçip ethernet kablosunu taktım.

![PIXEL](https://cdn-images-1.medium.com/max/3840/1*3GxvUdoi6NhmdOXVr-xeQA.jpeg)*PIXEL*

Sırasıyla aşağıdaki komutları girdim ama herhangi bir güncellemeyle karşılaşmadım.

```bash
sudo apt update
sudo apt upgrade
sudo apt full-upgrade
```

Ama böyle bir şeyin pek mümkün olmadığını düşünerek basit bir paket kurmayı denediğimde sistem böyle bir paketi bulamadığını söyledi.

```bash
sudo apt install cmake
```

Sistemim mevcut sürümden çok geride kaldığı için kendini yeni sürüme yükseltemiyordu. Yine de son kez şansımı denemek için

```bash
sudo rpi-update
sudo reboot
```

dedim ama sonuç değişmedi. Ben de kaderime razı olup SD kartı bilgisayarıma taktım ve Raspberry Pi’ın resmi [sitesine](https://www.raspberrypi.org/software/) girdim.

Raspberry Pi İmager adını verdikleri ufak bir programla imaj yazdırma işlemini acısız bir hale getirmişler. Programın Aur depolarında da mevcut olduğunu görünce hemen kurup açtım ama ilginç bir şekilde program benim SD kartımı görmedi.

Eskiden imaj yazma işini kolaylaştırmak için Raspberry Pi’ın çok ufak boyutlu bir paketi vardı. Sıkıştırılmış bir dosyayı indirip direkt olarak hafıza kartına atıp Raspberry Pi’a takıyorduk. Açılan arayüzden wifi, klavye vb bağlantıları yapıp istediğimiz dağıtımı seçtiğimizde Raspberry Pi internetten dağıtımı çekip kendini yeniden başlatıyordu ve işletim sistemimiz kurulmuş oluyordu. O zamanlar bunun en büyük artılarından birisi de ekran çözünürlüğünün vs kendi kendine ayarlanmasıydı. Eğer imaj dosyasını indirip yazdırma yaparsanız kendiniz oturup bir ton da ayar yapıyordunuz. Ama malesef artık öyle bir paket yoktu.

![](https://cdn-images-1.medium.com/max/5120/1*bkRQNnWnu_ZligQbW2ft-w.png)

Ben de gidip imaj dosyasını indirdim. Hafıza kartını da Fat32 olarak formatlayıp imajı yazdırdım.

```bash
dd bs=4M if=2021-01-11-raspios-buster-armhf.img of=/dev/sdX conv=fsync
```

SD kartı takıp Raspberry Pi’a güç verdiğimde sorunsuz bir şekilde açıldı.

## Zoom

Zoom uygulamasını kullanmak için ilk bulduğum yöntem toplantı linkine tıklayıp alttan “*Join from Your Browser”* demek.

![](https://cdn-images-1.medium.com/max/2732/1*ag1LiCg7RAEDHWJd8s2xGw.png)

Ses almak için aux girişine kulaklığımı taktığımda Raspberry Pi’ın kulaklığın mikrofonunu görmediğini gördüm. İnternette ufak bir araştırma yapınca hatırladım ki RPi'ın aux girişinin mikrofon desteği yoktu. Bluetooth kulaklığımı bağlayıp denediğimde mikrofonu kullanabildim.

Zoom uygulaması hali hazırda yüklü gelen Chromium üzerinde bir miktar yavaş olsa da çalışıyordu. Ama başka bir alternatif var mı acaba diye araştırmaya başladım.

![](https://cdn-images-1.medium.com/max/2732/1*UXV4U5aNH57ZXxl4s8TklQ.png)

Github’da [Pi-Apps](https://github.com/Botspot/pi-apps) adında bir proje buldum. RPi üzerine native olmayan uygulamaları kurmayı kolaylaştıran bu projede zoom da vardı.

```bash
git clone https://github.com/Botspot/pi-apps
~/pi-apps/install
```

![](https://cdn-images-1.medium.com/max/2000/1*09tkj1O1alHMDYO6M_yASw.png)

box86 adında bir emulator üzerine 32-bit Zoom’u kurup çalıştırıyordu. Raspberry Pi 4 için yeterince iyi olduğunu söylese de RPi3 için de bir şansımı denemek istedim.

![](https://cdn-images-1.medium.com/max/2732/1*jxEDk-9UW1PzXJZk9t5GFg.png)

Uygulama gayet güzel bir şekilde çalışıyordu. Browserdan üzerindekinden kesinlikle daha iyi çalıştığını söyleyebilirim.

![](https://cdn-images-1.medium.com/max/2732/1*EIB033ppb90dtYEQZXMdAg.png)

iBildiğim kadarıyla linux üzerinde eba canlı derslerine katılmak için Github’da [şöyle](https://github.com/sh4dowb/eba-canli-ders-crossplatform) bir proje var. Chrome eklentisini indirip kurmayı da başardım ama eba hesabım olmadığı için test edemedim.

## Golang

Go’nun birçok platformu desteklediğini bildiğim için denemeden geçmek olmaz dedim.

```bash
sudo apt install go
```

diyerek Go’yu kurdum ama burda ufak bir sorunla karşılaştım. 
Depolardaki sürüm 1.11 di ama şuanki güncel sürüm 1.15 sürümü.

```bash
sudo apt remove golang golang-1.11 golang-1.11-doc golang-1.11-go golang-1.11-src golang-doc
```

diyerek sistemdeki go paketlerini kaldırdım. Daha sonra

```bash
sudo rm -rf /user/local/go
```

diyerek Go’nun sistemde kalan son dosyalarını da tamamen temizledim.

Yeni sürümü çekip kurmak için

```
wget [https://dl.google.com/go/go1.14.4.linux-armv6l.tar.gz](https://dl.google.com/go/go1.14.4.linux-armv6l.tar.gz)
sudo tar -C /usr/local -xzf go1.14.4.linux-armv6l.tar.gz
```

Go’yu daha önceden sisteme kurduğum için herhangi bir PATH ayarlamam gerekmedi. Her şey sorunsuz bir şekilde çalıştı.

![](https://cdn-images-1.medium.com/max/2732/1*vstLp0Q2Xfhcb0Htut5whA.png)

## Vim

Go’yu test ederken vim’de bir gariplik olduğunu fark ettim. Vim normalden biraz farklı gibiydi. Paket yöneticisinde arattığımda normal vim değil vim-tiny paketinin kurulu geldiğini gördüm.

![vim-tiny](https://cdn-images-1.medium.com/max/2732/1*v19fIjL-tbd70HkS7STXwQ.png)*vim-tiny*
```bash
sudo apt install vim
```

diyerek vim’i kurdum. Vim’i ben [şu](https://github.com/amix/vimrc) configle kullandığım için onu da kurmayı denedim.

```bash
git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime
sh ~/.vim_runtime/install_awesome_vimrc.sh
```

![](https://cdn-images-1.medium.com/max/2732/1*nZhCaip-0Eac_RCwlkpOoQ.png)

Bu haliyle vim benim için kullanıma hazırdı. Vim-go eklentisini de kurmayı denedim ama bazı sorunlar çıkartıp çalışmadı.

## Visual Studio Code

Ben Pi-Apps uygulamasını kullanarak vscode’u kurmayı tercih ettim ama arm versiyonu [web sitesinde](https://code.visualstudio.com/#alt-downloads) mevcut. Oradan indirip kurmak daha sağlıklı olacaktır. Go eklentisini kurup tüm yardımcı toolları da sorunsuz bir şekilde kurmayı başardım. Visual Studio Code, Raspberry Pi üzerinde gayet iyi çalışıyor.

![](https://cdn-images-1.medium.com/max/2732/1*UyZYI1w95RqbyptVoBeypA.png)

## Minecraft

Minecraft’ın Pi Edition adında bir sürümü var. Bu sürümü ilk çıktığı zamanlarda denemiştim ama Minecraft’ın fazla basit bir versiyonu ve çok hoşuma gitmemişti. Acaba onda bir gelişme var mı diye kontrol ettim ama bıraktığım haliyle duruyordu.

![Minecraft Pi Edition](https://cdn-images-1.medium.com/max/2000/1*lxdGxjO83RH810t3fM1xCw.jpeg)*Minecraft Pi Edition*

İnternette biraz gezinince gördüm ki insanlar java versiyonunu kurup çalıştırabiliyorlarmış ama benim ilgimi bir şey daha çok çekti. Pi-Apps uygulamasında Minecraft’ın mobil olan versiyonu mevcuttu. Hemen onu kurdum. Benden bir adet apk dosyası istedi. İnternetten bir tane indirip şansımı denedim ama lisans sorunuyla karşılaştım.

![](https://cdn-images-1.medium.com/max/2732/1*UQjwmnj-6gKnzIt5VRXIVQ.png)

Minecraft olmuyorsa açık kaynak olan Minetest var diyip depolardan onu kurdum.

```bash
sudo apt install minetest
```

Ama onda da fazlasıyla düşük (2–3) fps aldım.

![Minetest](https://cdn-images-1.medium.com/max/2732/1*qxAIZGevxhcnb5z67r2yfQ.png)*Minetest*

İllaki bir oyun oynamam lazım boşuna mı çıkarttık bu aleti diyerek Doom 3 kurmaya karar verdim. Beni yaklaşık olarak 1 saat bekleten uzun bir kurulumdan sonra hata alınca artık pes etmeye karar verdim.

![](https://cdn-images-1.medium.com/max/2732/1*y4R_McEemyBDZ8PVsh8jXQ.png)

Raspberry Pi -her ne kadar beni yer yer çıldırtsa da- kesinlikle eskisinden daha iyi bir platform haline gelmiş. Yeni çıkan modellerle birlikte de oldukça güçlenmiş. Pinebook gibi cihazların da geliştirilmesiyle ARM tabanlı linux cihazlar her geçen gün kendilerini geliştirmeye devam ediyorlar.

Son zamanlarda gördüğüm kadarıyla Ipad’e bağlayarak bir geliştirme ortamı olarak kullanmak ta yaygınlaşmaya başladı.

<center><iframe width="560" height="315" src="https://www.youtube.com/embed/IR6sDcKo3V8" frameborder="0" allowfullscreen></iframe></center>

Bu küçük cihazlar ilerde geliştirme ortamlarımızın yerine geçebilirler mi emin değilim ama benim ilgimi çekmeye devam ediyorlar.
