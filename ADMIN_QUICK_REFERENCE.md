# P.S. It's A Vibe - Admin Quick Reference

**For Shelby's easy reference while managing the homepage from the admin app.**

---

## 📋 Homepage Sections You Can Edit

### 1. 🎨 Hero Banner
**What:** The big banner at the top with your main message
**Edit:** 
- Upload a new hero image
- Change the headline (e.g., "Discover Your Vibe")
- Change the subheading
- Change the button text and where it links

**Tips:**
- Use high-quality, eye-catching images
- Image should be 1400×600px (widescreen)
- Headline should be short and punchy (3-5 words)

---

### 2. 🎯 Promotions (Rotating Banners)
**What:** Special offers that rotate at the top of the page
**Edit:**
- Create NEW promotions
- Edit existing promotions
- Delete old promotions
- Turn promotions ON/OFF
- Set dates when promotions start and end

**How to Add a Promo:**
1. Click "Add Promotion" in admin app
2. Upload promo image (800×400px recommended)
3. Write title (e.g., "Summer Sale")
4. Write description (e.g., "Up to 50% off")
5. Set button text (e.g., "Shop Sale")
6. Set where button goes (e.g., /shop.html?category=sale)
7. Choose start date (when it should appear)
8. Choose end date (when it should disappear)
9. Click Save

**Pro Tips:**
- If you set an end date, the promo automatically disappears—no manual removal needed
- You can have multiple promotions showing at once; they rotate automatically
- If a promo has no dates, it shows until you turn it OFF
- Older promotions are at the bottom, newer at the top

---

### 3. ⭐ Featured Products
**What:** Carousel of products you want to highlight
**Edit:**
- Add products to feature (search by name or ID)
- Remove products from featured
- Drag to change order (left to right in carousel)

**How to Add a Featured Product:**
1. Click "Add to Featured" in admin app
2. Search for product by name
3. Click the product
4. It appears in your featured list
5. Drag it to change position
6. Save

**Limits:** Max 8-10 products (for performance)

---

### 4. 📂 Categories
**What:** The category tiles that let customers shop by type
**Edit:**
- Upload category image
- Change category name
- Turn categories ON/OFF
- Drag to change order

**How to Manage Categories:**
1. See list of all categories
2. For each category you want to show:
   - Upload a nice category image (300×300px)
   - Toggle ON to show it
3. Drag categories to reorder them (top to bottom)
4. Save

**Recommendation:** Show 4-6 main categories

---

### 5. 📝 About Section
**What:** Short description of P.S. It's A Vibe brand
**Edit:**
- Change the about text
- Upload an optional about image

**Tips:**
- Keep it to 2-3 sentences max
- Tell your brand story
- Optional: Add a supporting image

---

## ⏰ Understanding Dates

**Start Date:** When a promotion should begin showing
- Example: Set to June 1st, 2025 → promo won't appear until that date
- Leave blank = no start restriction

**End Date:** When a promotion should stop showing
- Example: Set to August 31st, 2025 → promo disappears on Sept 1st
- Leave blank = no end restriction

**Pro Tip:** For seasonal sales, just set the end date and forget about it—it vanishes automatically!

---

## 🚀 Getting Changes Live

1. **Make a change in admin app** (e.g., update hero headline)
2. **Click Save**
3. **Website updates immediately** ✨

No waiting, no page refresh, no code changes needed!

---

## 📸 Image Guidelines

### Hero Banner Image
- **Size:** 1400px wide × 600px tall
- **File Size:** Keep under 400KB
- **Format:** JPG or PNG (or WebP)
- **Tips:** High contrast, bright colors work best

### Promo Image
- **Size:** 800px wide × 400px tall
- **File Size:** Keep under 300KB
- **Format:** JPG or PNG
- **Tips:** Show sale/discount clearly

### Category Image
- **Size:** 300px × 300px (square)
- **File Size:** Keep under 200KB
- **Format:** JPG or PNG
- **Tips:** Clear, recognizable images of product types

### About Section Image (Optional)
- **Size:** 500px wide × 400px tall
- **File Size:** Keep under 250KB
- **Tips:** Should match brand aesthetic

---

## 🎨 Color & Style Tips

**P.S. It's A Vibe Colors:**
- Purple & Cyan accents
- Dark theme (black background)
- Modern, clean look

**When creating/editing images:**
- Use bright, contrasting colors
- Ensure text is readable on top of images
- Test on phone to see how it looks

---

## ⚡ Quick Tasks

### Task: Run a Flash Sale
1. Go to Promotions
2. Click "Add Promotion"
3. Title: "Flash Sale - 24 Hours"
4. Description: "Limited time offer"
5. Upload promo image
6. Set End Date to tomorrow at 11:59pm
7. Save & done!

### Task: Update Seasonal Message
1. Go to Hero Banner
2. Change headline
3. Click Save
4. Live immediately!

### Task: Highlight New Products
1. Go to Featured Products
2. Add your 5 newest items
3. Put bestsellers at the top (drag to reorder)
4. Save & done!

### Task: Hide a Category
1. Go to Categories
2. Find the category
3. Click the toggle to OFF
4. Save
5. Category disappears from homepage

---

## 🔍 Troubleshooting

### Promo not showing?
- Check: Is it enabled (toggle is ON)?
- Check: Is today's date between start and end dates?
- Check: Did you save?

### Image not showing?
- Make sure image uploaded successfully
- Check image URL in Firebase Storage
- Try refreshing the page

### Changes not appearing?
- Click Save (make sure it confirms)
- Refresh your browser
- Check for console errors (F12 → Console)

### Want to undo a change?
- Quickly click Edit again and revert
- Or contact technical support

---

## 📊 Best Practices

✅ **DO:**
- Update content regularly (keep it fresh!)
- Use high-quality images
- Keep descriptions short and compelling
- Test changes on mobile before major launches
- Archive old promotions

❌ **DON'T:**
- Leave blank fields (fill in all required fields)
- Use oversized images (they slow down site)
- Write super long descriptions
- Forget to set end dates on time-limited promos
- Leave old promotions enabled accidentally

---

## 🎯 Content Ideas

### Seasonal Promotions
- Summer Sale (June-August)
- Back to School (August-September)
- Holiday Sale (November-December)
- New Year New You (January)

### Featured Products Rotation
- Weekly bestsellers
- New arrivals
- Customer favorites
- Seasonal items

### Category Highlights
- Trending category
- Newly restocked category
- Customer-favorite category

---

## 📞 Need Help?

- **Technical Issues:** See DEPLOYMENT_GUIDE.md or ADMIN_INTEGRATION_GUIDE.md
- **Firestore Structure:** See HOMEPAGE_FIRESTORE_SETUP.md
- **General Questions:** Check HOMEPAGE_REDESIGN_README.md

---

## 📋 Checklist: Monthly Homepage Review

Every month, check:
- [ ] Update promotions (add new, remove old)
- [ ] Refresh featured products
- [ ] Check if any promotions ended (remove if needed)
- [ ] Update hero banner if needed
- [ ] Review analytics (if available)
- [ ] Test on mobile device

---

## 🌟 Pro Tips

**Tip 1:** Create seasonal promotions ahead of time
- Set end dates for auto-removal
- No need to remember to turn them off

**Tip 2:** A/B test different hero banners
- Note engagement metrics
- Use what works best

**Tip 3:** Keep best-sellers featured
- Rotate every 2-3 weeks
- Drives sales

**Tip 4:** Use promotions strategically
- Not always on sale (devalues products)
- Use for seasonal pushes

**Tip 5:** Tell your brand story in About section
- Who are you?
- What makes you different?
- Why should customers buy from you?

---

## 🚀 Example: Setting Up This Month

### This Month's Plan:
1. **Hero:** Summer vibes banner + "Summer Vibes Incoming"
2. **Promotions:** 
   - Active: "15% Off Everything" (no end date)
   - Upcoming: "Flash Sale Friday" (auto-ends Sunday)
3. **Featured:** Top 6 bestsellers
4. **Categories:** All 6 active + sorted by popularity
5. **About:** Updated brand story

**Time to set up:** ~15 minutes

---

**Last Updated:** July 2026
**Questions?** Check the full documentation in the repository.
