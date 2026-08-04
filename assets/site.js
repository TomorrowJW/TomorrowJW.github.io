(function () {
  "use strict";

  const body = document.body;
  const languageButtons = document.querySelectorAll("[data-set-language]");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  function setLanguage(language) {
    const next = language === "en" ? "en" : "zh";
    body.classList.toggle("lang-en", next === "en");
    body.classList.toggle("lang-zh", next === "zh");
    document.documentElement.lang = next === "en" ? "en" : "zh-CN";
    languageButtons.forEach(function (button) {
      const active = button.dataset.setLanguage === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    try {
      localStorage.setItem("jw-language", next);
    } catch (error) {
      // Language switching still works when storage is unavailable.
    }
  }

  let initialLanguage = "zh";
  try {
    initialLanguage = localStorage.getItem("jw-language") || "zh";
  } catch (error) {
    initialLanguage = "zh";
  }
  setLanguage(initialLanguage);

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.setLanguage);
    });
  });

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const paperImageMap = {
    "RA-COD: Retrieval-Augmented Camouflaged Object Detection": "tip2026-ra-cod.jpg",
    "Du-CIPT: Dual Cross-Modal Interactive Pyramid Transformer for RGB-Thermal Salient Object Detection and Segmentation": "image2026-du-cipt.jpg",
    "SPP-SCL: Semi-Push-Pull Supervised Contrastive Learning for Image-Text Sentiment Analysis and Beyond": "aaai2026-spp-scl.jpg",
    "Boosting Foreground-Background Disentanglement for Camouflaged Object Detection": "tomm2025-fbd-net.jpg",
    "MambaCOD: Cross-modal Mamba Fusion Network with Adapter Tuning for RGB-D Camouflaged Object Detection": "prcv2025-mambacod.jpg",
    "Shift the Lens: Environment-Aware Unsupervised Camouflaged Object Detection": "cvpr2025-ease.jpg",
    "Beyond Single Images: Retrieval Self-Augmented Unsupervised Camouflaged Object Detection": "iccv2025-rise.jpg",
    "UpGen: Unleashing Potential of Foundation Models for Training-Free Camouflage Detection via Generative Models": "tip2025-upgen.jpg",
    "Large Coordinate Attention Network for Lightweight Image Super-Resolution": "eaai2025-lcan.jpg",
    "Transformer Fusion and Pixel-Level Contrastive Learning for RGB-D Salient Object Detection": "tmm2024-tpcl.jpg",
    "Weighted Dense Semantic Aggregation and Explicit Boundary Modeling for Camouflaged Object Detection": "sj2024-sae-net.jpg",
    "Lightweight Blueprint Residual Network for Single Image Super-Resolution": "eswa2024-lbrn.jpg",
    "FAClue: Exploring Frequency Clues by Adaptive Frequency-Attention for Deepfake Detection": "ccc2023-faclue.jpg",
    "FINet: Frequency Injection Network for Lightweight Camouflaged Object Detection": "spl2023-finet.jpg",
    "Mask-and-Edge Co-Guided Separable Network for Camouflaged Object Detection": "spl2023-mecs-net.jpg",
    "HGLNet: A Generic Hierarchical Global-Local Feature Fusion Network for Multi-Modal Classification": "icme2022-hglnet.jpg",
    "Visual Sentiment Classification via Low-Rank Regularization and Label Relaxation": "tcds2022-vsc.jpg"
  };

  const paperRankMap = {
    "Depth-Assisted Mamba with Adapter Tuning for Rail Surface Defect Detection": { zh: "CCF C", en: "CCF C" },
    "RA-COD: Retrieval-Augmented Camouflaged Object Detection": { zh: "CCF A", en: "CCF A" },
    "Du-CIPT: Dual Cross-Modal Interactive Pyramid Transformer for RGB-Thermal Salient Object Detection and Segmentation": { zh: "CCF C", en: "CCF C" },
    "SPP-SCL: Semi-Push-Pull Supervised Contrastive Learning for Image-Text Sentiment Analysis and Beyond": { zh: "CCF A", en: "CCF A" },
    "Boosting Foreground-Background Disentanglement for Camouflaged Object Detection": { zh: "CCF B", en: "CCF B" },
    "MambaCOD: Cross-modal Mamba Fusion Network with Adapter Tuning for RGB-D Camouflaged Object Detection": { zh: "CCF C", en: "CCF C" },
    "Shift the Lens: Environment-Aware Unsupervised Camouflaged Object Detection": { zh: "CCF A", en: "CCF A" },
    "Beyond Single Images: Retrieval Self-Augmented Unsupervised Camouflaged Object Detection": { zh: "CCF A", en: "CCF A" },
    "UpGen: Unleashing Potential of Foundation Models for Training-Free Camouflage Detection via Generative Models": { zh: "CCF A", en: "CCF A" },
    "Large Coordinate Attention Network for Lightweight Image Super-Resolution": { zh: "CCF C", en: "CCF C" },
    "Transformer Fusion and Pixel-Level Contrastive Learning for RGB-D Salient Object Detection": { zh: "CCF A", en: "CCF A" },
    "Weighted Dense Semantic Aggregation and Explicit Boundary Modeling for Camouflaged Object Detection": { zh: "非 CCF · 中科院二区", en: "Non-CCF · CAS Q2" },
    "Lightweight Blueprint Residual Network for Single Image Super-Resolution": { zh: "CCF C", en: "CCF C" },
    "FAClue: Exploring Frequency Clues by Adaptive Frequency-Attention for Deepfake Detection": { zh: "非 CCF · EI", en: "Non-CCF · EI" },
    "FINet: Frequency Injection Network for Lightweight Camouflaged Object Detection": { zh: "CCF C", en: "CCF C" },
    "Mask-and-Edge Co-Guided Separable Network for Camouflaged Object Detection": { zh: "CCF C", en: "CCF C" },
    "HGLNet: A Generic Hierarchical Global-Local Feature Fusion Network for Multi-Modal Classification": { zh: "CCF B", en: "CCF B" },
    "Visual Sentiment Classification via Low-Rank Regularization and Label Relaxation": { zh: "非 CCF · 中科院三区", en: "Non-CCF · CAS Q3" }
  };

  document.querySelectorAll(".publication-list .paper-card").forEach(function (paper) {
    const titleElement = paper.querySelector(".paper-title");
    if (!titleElement) return;

    const title = titleElement.textContent.trim();
    const imageName = paperImageMap[title];
    const rank = paperRankMap[title];
    const pdfLink = Array.from(paper.querySelectorAll("a")).find(function (link) {
      return (link.getAttribute("href") || "").toLowerCase().endsWith(".pdf");
    });

    if (rank) {
      const badge = document.createElement("p");
      badge.className = "paper-rank";
      badge.innerHTML = '<span data-lang="zh">' + rank.zh + '</span><span data-lang="en">' + rank.en + "</span>";
      const venue = paper.querySelector(".paper-venue");
      (venue || titleElement).insertAdjacentElement("afterend", badge);
    }

    if (imageName) {
      const visual = document.createElement(pdfLink ? "a" : "div");
      visual.className = "paper-visual";
      if (pdfLink) {
        visual.href = pdfLink.getAttribute("href");
        visual.setAttribute("aria-label", "Open PDF preview: " + title);
      }

      const image = document.createElement("img");
      image.src = "./images/papers/" + imageName;
      image.alt = title + " paper preview";
      image.loading = "lazy";
      image.decoding = "async";
      visual.appendChild(image);
      paper.appendChild(visual);
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "paper-visual paper-visual--placeholder";
    placeholder.setAttribute("aria-label", title + " paper preview pending");
    placeholder.innerHTML = "<strong>MambaRSDD</strong><small>Preview pending</small>";
    paper.appendChild(placeholder);
  });

  const separateCertificateGallery = document.querySelector(".certificate-showcase");
  if (separateCertificateGallery) separateCertificateGallery.remove();

  document.querySelectorAll(".achievement-list li, .student-list [data-certificate-images]").forEach(function (item) {
    const files = (item.dataset.certificateImages || "").split(",").map(function (file) {
      return file.trim();
    }).filter(Boolean);

    const titleElement = item.querySelector("strong");
    const title = titleElement ? titleElement.textContent.trim() : "student achievement";
    const copy = document.createElement("div");
    copy.className = "achievement-copy";
    while (item.firstChild) copy.appendChild(item.firstChild);

    const media = document.createElement("div");
    media.className = "achievement-media";
    files.forEach(function (file, index) {
      const link = document.createElement("a");
      link.href = "./images/certificates/" + file;
      link.target = "_blank";
      link.rel = "noopener";
      link.setAttribute("aria-label", "Open certificate " + (index + 1) + ": " + title);

      const image = document.createElement("img");
      image.src = link.href;
      image.alt = "Certificate " + (index + 1) + " for " + title;
      image.loading = "lazy";
      image.decoding = "async";
      link.appendChild(image);
      media.appendChild(link);
    });

    if (!files.length) {
      const placeholder = document.createElement("div");
      placeholder.className = "achievement-certificate-placeholder";
      placeholder.setAttribute("aria-label", title + " certificate image pending");
      placeholder.innerHTML = '<strong data-lang="zh">证书图片待补充</strong><strong data-lang="en">Certificate image pending</strong>';
      media.appendChild(placeholder);
      item.classList.add("certificate-pending");
    }

    item.classList.add("has-certificate");
    item.appendChild(copy);
    item.appendChild(media);
  });

  const footerContainer = document.querySelector(".site-footer .container");
  if (footerContainer && !footerContainer.querySelector(".site-counts")) {
    const siteCounts = document.createElement("div");
    siteCounts.className = "site-counts";
    siteCounts.innerHTML = '<span id="busuanzi_container_site_pv"><span data-lang="zh">本站总访问量：</span><span data-lang="en">Total visits: </span><span id="busuanzi_value_site_pv">1822</span><span data-lang="zh"> 次</span></span>&nbsp; | &nbsp;<span id="busuanzi_container_site_uv"><span data-lang="zh">本站访客数：</span><span data-lang="en">Visitors: </span><span id="busuanzi_value_site_uv">1373</span><span data-lang="zh"> 人</span></span>';
    footerContainer.appendChild(siteCounts);
  }

  if (!document.getElementById("busuanzi-counter-script")) {
    const counterScript = document.createElement("script");
    counterScript.id = "busuanzi-counter-script";
    counterScript.async = true;
    counterScript.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    document.body.appendChild(counterScript);
  }

  const newsTimeline = document.querySelector(
  'section[aria-labelledby="news-title"] .timeline'
);

if (newsTimeline) {
  const newsLimit = 8;

  function loadHtmlPage(path) {
    return fetch(path, { cache: "no-store" })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + path);
        }
        return response.text();
      })
      .then(function (html) {
        return new DOMParser().parseFromString(html, "text/html");
      });
  }

  function getLanguageText(element, language) {
    if (!element) return "";

    const target = element.querySelector(
      '[data-lang="' + language + '"]'
    );

    return target ? target.textContent.trim() : "";
  }

  function getAchievementResult(element, language) {
    if (!element) return "";

    const target = Array.from(element.children).find(function (child) {
      return (
        child.dataset.lang === language &&
        !child.classList.contains("student-congrats")
      );
    });

    return target ? target.textContent.trim() : "";
  }

  function appendPaperMessage(paragraph, language, item) {
    const content = document.createElement("span");
    content.dataset.lang = language;

    content.appendChild(
      document.createTextNode(language === "zh" ? "论文 " : "Our paper ")
    );

    const title = document.createElement("strong");
    title.textContent = item.shortTitle;
    content.appendChild(title);

    content.appendChild(
      document.createTextNode(
        language === "zh"
          ? " 发表于 " + item.venue + "。"
          : " was published in " + item.venue + "."
      )
    );

    paragraph.appendChild(content);
  }

  function appendCompetitionMessage(paragraph, language, item) {
    const content = document.createElement("span");
    content.dataset.lang = language;

    content.appendChild(
      document.createTextNode(
        language === "zh"
          ? "指导学生参加 "
          : "Students participated in "
      )
    );

    const title = document.createElement("strong");
    title.textContent =
      language === "zh" ? item.zhTitle : item.enTitle;
    content.appendChild(title);

    const result =
      language === "zh" ? item.zhResult : item.enResult;

    if (result) {
      content.appendChild(
        document.createTextNode(
          language === "zh" ? "：" + result : ": " + result
        )
      );
    }

    paragraph.appendChild(content);
  }

  function renderNews(items) {
    if (!items.length) return;

    newsTimeline.replaceChildren();

    items.slice(0, newsLimit).forEach(function (item) {
      const listItem = document.createElement("li");

      const time = document.createElement("time");
      time.dateTime = String(item.year);
      time.textContent = String(item.year);

      const paragraph = document.createElement("p");

      if (item.type === "paper") {
        appendPaperMessage(paragraph, "zh", item);
        appendPaperMessage(paragraph, "en", item);
      } else {
        appendCompetitionMessage(paragraph, "zh", item);
        appendCompetitionMessage(paragraph, "en", item);
      }

      listItem.appendChild(time);
      listItem.appendChild(paragraph);
      newsTimeline.appendChild(listItem);
    });
  }

  Promise.all([
    loadHtmlPage("./publications.html"),
    loadHtmlPage("./students.html")
  ])
    .then(function (documents) {
      const publicationsDocument = documents[0];
      const studentsDocument = documents[1];

      const publicationNews = Array.from(
        publicationsDocument.querySelectorAll(
          ".publication-list .paper-card"
        )
      )
        .map(function (paper, index) {
          const fullTitle =
            paper.querySelector(".paper-title")?.textContent.trim() || "";

          const venue =
            paper.querySelector(".paper-venue")?.textContent.trim() || "";

          const year = Number(paper.dataset.paperYear);

          if (!fullTitle || !venue || !year) return null;

          return {
            type: "paper",
            typeOrder: 0,
            order: index,
            year: year,
            shortTitle: fullTitle.includes(":")
              ? fullTitle.split(":")[0].trim()
              : fullTitle,
            venue: venue
          };
        })
        .filter(Boolean);

      const competitionNews = [];

      studentsDocument
        .querySelectorAll(".year-block")
        .forEach(function (yearBlock) {
          const heading = yearBlock.querySelector("h3");
          const yearMatch = heading?.textContent.match(/20\d{2}/);

          if (!yearMatch) return;

          const year = Number(yearMatch[0]);

          yearBlock
            .querySelectorAll(".achievement-list > li")
            .forEach(function (achievement, index) {
              const titleElement =
                achievement.querySelector("strong");

              const detailElement =
                achievement.querySelector(".achievement-detail");

              const zhTitle =
                getLanguageText(titleElement, "zh") ||
                titleElement?.textContent.trim() ||
                "";

              const enTitle =
                getLanguageText(titleElement, "en") || zhTitle;

              if (!zhTitle) return;

              competitionNews.push({
                type: "competition",
                typeOrder: 1,
                order: index,
                year: year,
                zhTitle: zhTitle,
                enTitle: enTitle,
                zhResult: getAchievementResult(
                  detailElement,
                  "zh"
                ),
                enResult: getAchievementResult(
                  detailElement,
                  "en"
                )
              });
            });
        });

      const allNews = publicationNews
        .concat(competitionNews)
        .sort(function (first, second) {
          return (
            second.year - first.year ||
            first.typeOrder - second.typeOrder ||
            first.order - second.order
          );
        });

      renderNews(allNews);
    })
    .catch(function () {
      // 自动读取失败时，继续显示 index.html 中原来的近期消息。
    });
}
  
  const filterButtons = document.querySelectorAll("[data-publication-filter]");
  const papers = document.querySelectorAll("[data-paper-year]");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.publicationFilter;
      filterButtons.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      papers.forEach(function (paper) {
        paper.hidden = filter !== "all" && paper.dataset.paperYear !== filter;
      });
    });
  });
})();
