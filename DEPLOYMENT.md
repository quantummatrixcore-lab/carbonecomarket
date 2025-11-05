# 🚀 CarbonEcoMarket - Deployment Guide

## Vercel'a Deploy Etme - 2 Yöntem

### ✅ YÖNTEM 1: GitHub Integration (ÖNERİLEN - EN KOLAY)

1. **Vercel Dashboard'a Git**
   - https://vercel.com/login adresine git
   - GitHub hesabınla giriş yap

2. **Yeni Proje Ekle**
   - "Add New..." → "Project" tıkla
   - GitHub repository'lerini göreceksin

3. **Repository'yi Seç**
   - `quantummatrixcore-lab/carbonecomarket` repository'sini bul
   - "Import" butonuna tıkla

4. **Proje Ayarları**
   - Project Name: `karbon-eko-pazarı-e5u5` (veya istediğin isim)
   - Framework Preset: Other (vanilla HTML/CSS/JS)
   - Root Directory: `./` (default)
   - Build Command: (boş bırak)
   - Output Directory: `./` (default)

5. **Deploy Et**
   - "Deploy" butonuna tıkla
   - 1-2 dakika bekle ✅

6. **Domain Ayarla**
   - Deployment tamamlandıktan sonra "Settings" → "Domains"
   - `carbonecomarket.com` domain'ini ekle
   - Vercel'ın verdiği DNS ayarlarını domain sağlayıcında yap

### 🔧 YÖNTEM 2: CLI ile Manuel Deploy

```bash
# 1. Vercel'a login ol
vercel login

# 2. Projeyi deploy et
vercel --prod

# 3. Soruları cevapla:
# - Set up and deploy? → Y
# - Which scope? → quantummatrixcore-lab
# - Link to existing project? → N
# - Project name? → carbonecomarket
# - Directory? → ./
# - Override settings? → N
```

---

## 📋 Deployment Checklist

- [x] Git branch oluşturuldu
- [x] Tüm dosyalar commit edildi
- [x] Remote'a push yapıldı
- [ ] Vercel'a deploy edildi
- [ ] Domain bağlandı (carbonecomarket.com)
- [ ] TR ve EN versiyonlar test edildi

---

## 🌐 Beklenen URL'ler

Deployment sonrası:

- **Türkçe Ana Sayfa**: https://carbonecomarket.com/
- **English Main Page**: https://carbonecomarket.com/en/
- **Vercel Default URL**: https://carbonecomarket.vercel.app/

---

## 🔍 Deployment Sonrası Test

1. Ana sayfayı aç (TR): https://carbonecomarket.com/
2. Dil değiştiriciyi test et: TR → EN
3. Responsive testi: Mobil, Tablet, Desktop
4. Karbon hesaplayıcıyı test et
5. Tüm linklerin çalıştığını kontrol et
6. Chart.js grafiklerinin yüklendiğini kontrol et

---

## ⚡ Otomatik Deployment

GitHub integration yapıldıktan sonra:

- Her `git push` otomatik olarak preview deploy oluşturur
- `main` branch'e merge → otomatik production deploy
- Her branch için ayrı preview URL

---

## 🐛 Sorun Giderme

### Deployment başarısız olursa:

1. **Vercel logs kontrol et**:
   - Vercel dashboard → Deployments → Log'lara bak

2. **vercel.json kontrolü**:
   - Routing ayarlarının doğru olduğundan emin ol

3. **Dosya yolları**:
   - CSS/JS yollarının doğru olduğunu kontrol et
   - `/en/index.html` için `../styles.css` kullanıldığından emin ol

---

## 📞 Destek

Sorun yaşarsan:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

✅ **Hazırsın! Şimdi Vercel Dashboard'a git ve deploy et!**
