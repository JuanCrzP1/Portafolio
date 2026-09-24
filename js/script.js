/* =========================================================
   PORTAFOLIO — Interacciones con jQuery
   ========================================================= */

$(function () {

  var $window = $(window);
  var $doc = $(document);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var enableMouseFx = finePointer && !reduceMotion;

  /* ---------------------------------------------------------
     1. Text reveal: divide los títulos en palabras animables
  --------------------------------------------------------- */
  $('[data-split]').each(function () {
    var index = 0;

    function wrap(node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        var $frag = $(document.createDocumentFragment());
        $.each(parts, function (_, part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            $frag.append(document.createTextNode(part));
          } else {
            $frag.append(
              $('<span class="w"><span class="w-in"></span></span>')
                .find('.w-in').text(part).css('transition-delay', (index++ * 55) + 'ms').end()
            );
          }
        });
        $(node).replaceWith($frag);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        var $el = $(node);
        var $w = $('<span class="w"><span class="w-in"></span></span>');
        $w.find('.w-in').css('transition-delay', (index++ * 55) + 'ms');
        $el.before($w);
        $w.find('.w-in').append($el);
      }
    }

    $.each($(this).contents().toArray(), function (_, node) { wrap(node); });
  });

  /* ---------------------------------------------------------
     2. Reveal al hacer scroll (con retrasos escalonados)
  --------------------------------------------------------- */
  var $reveals = $('[data-reveal]');

  $reveals.each(function () {
    var delay = $(this).data('delay');
    if (delay && !$(this).is('[data-split]')) {
      $(this).css('transition-delay', delay + 'ms');
    }
  });

  function revealOnScroll() {
    var limit = $window.scrollTop() + $window.height() * 0.9;
    $reveals.not('.is-visible').each(function () {
      if ($(this).offset().top < limit) {
        var $el = $(this);
        $el.addClass('is-visible');
        // Tras la entrada se elimina el retraso para que las interacciones respondan al instante
        setTimeout(function () { $el.css('transition-delay', ''); }, 1400);
      }
    });
  }

  /* ---------------------------------------------------------
     3. Navbar: estado al hacer scroll + indicador animado
  --------------------------------------------------------- */
  var $nav = $('#mainNav');
  var $indicator = $('.nav-indicator');
  var $navLinks = $('#navbarNav .nav-link');

  function moveIndicator($link) {
    if (!$link || !$link.length || $window.width() < 992) {
      $indicator.removeClass('is-ready');
      return;
    }
    var wrapLeft = $link.closest('.nav-links-wrap').offset().left;
    $indicator
      .css({ left: $link.offset().left - wrapLeft, width: $link.outerWidth() })
      .addClass('is-ready');
  }

  function activeLink() { return $navLinks.filter('.active').first(); }

  $navLinks
    .on('mouseenter', function () { moveIndicator($(this)); })
    .on('mouseleave', function () { moveIndicator(activeLink()); });

  // Cerrar el menú móvil al elegir un enlace
  $('#navbarNav a').on('click', function () {
    var $collapse = $('#navbarNav');
    if ($collapse.hasClass('show')) {
      bootstrap.Collapse.getOrCreateInstance($collapse[0]).hide();
    }
  });

  $('#navbarNav')
    .on('show.bs.collapse', function () { $nav.addClass('menu-open'); })
    .on('hidden.bs.collapse', function () { $nav.removeClass('menu-open'); });

  /* ---------------------------------------------------------
     4. Sección activa (solo index.html)
  --------------------------------------------------------- */
  var $sections = $('#inicio, #sobre-mi, #habilidades');

  function updateActiveSection() {
    if (!$sections.length) return;
    var pos = $window.scrollTop() + $window.height() * 0.35;
    var current = 'inicio';
    $sections.each(function () {
      if ($(this).offset().top <= pos) current = this.id;
    });
    if ($('#contacto').length && $('#contacto').offset().top <= pos) current = null;

    var $target = current ? $navLinks.filter('[data-section="' + current + '"]') : $();
    if ($target[0] !== activeLink()[0]) {
      $navLinks.removeClass('active');
      $target.addClass('active');
      moveIndicator($target);
    }
  }

  /* ---------------------------------------------------------
     5. Parallax sutil en scroll
  --------------------------------------------------------- */
  var $parallax = $('[data-parallax]');

  function updateParallax() {
    if (reduceMotion) return;
    var viewCenter = $window.scrollTop() + $window.height() / 2;
    $parallax.each(function () {
      var $el = $(this);
      var center = $el.offset().top + $el.outerHeight() / 2;
      var shift = (center - viewCenter) * parseFloat($el.data('parallax')) * -1;
      this.style.setProperty('--parallax', shift.toFixed(1) + 'px');
    });
  }

  /* ---------------------------------------------------------
     6. Scroll: un solo manejador sincronizado con rAF
  --------------------------------------------------------- */
  var $progress = $('.scroll-progress span');
  var ticking = false;

  function onScroll() {
    var top = $window.scrollTop();
    var max = $doc.height() - $window.height();
    $progress.css('transform', 'scaleX(' + (max > 0 ? top / max : 0) + ')');
    $nav.toggleClass('is-scrolled', top > 30);
    revealOnScroll();
    updateActiveSection();
    updateParallax();
    ticking = false;
  }

  $window.on('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  });

  $window.on('resize', function () {
    onScroll();
    moveIndicator(activeLink());
  });

  onScroll();
  // Esperar a que carguen las fuentes para medir correctamente el indicador
  $window.on('load', function () { moveIndicator(activeLink()); onScroll(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { moveIndicator(activeLink()); });
  }

  /* ---------------------------------------------------------
     6b. Retrato del hero: si la foto de perfil carga bien, se muestra;
         si no, se conserva el placeholder junto al nombre.
  --------------------------------------------------------- */
  var $portraitImg = $('.portrait-img');

  if ($portraitImg.length) {
    var $avatar = $portraitImg.closest('.hero-avatar');
    var showPhoto = function () { $avatar.addClass('has-photo'); };
    if ($portraitImg[0].complete && $portraitImg[0].naturalWidth > 0) {
      showPhoto();
    } else {
      $portraitImg.on('load', showPhoto);
      $portraitImg.on('error', function () { $(this).prop('hidden', true); });
    }
  }

  /* ---------------------------------------------------------
     7. Hero: spotlight y profundidad según el cursor
  --------------------------------------------------------- */
  if (enableMouseFx) {
    $('.hero, .page-hero').on('mousemove', function (e) {
      var $hero = $(this);
      var offset = $hero.offset();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      $hero.find('.spotlight').css({ '--mx': x + 'px', '--my': y + 'px' });

      var rx = (x / $hero.outerWidth()) - 0.5;
      var ry = (y / $hero.outerHeight()) - 0.5;
      $hero.find('[data-mouse-depth]').each(function () {
        var depth = parseFloat($(this).data('mouse-depth'));
        var tx = (rx * depth).toFixed(1) + 'px';
        var ty = (ry * depth).toFixed(1) + 'px';
        if ($(this).hasClass('orbit-stage')) {
          this.style.setProperty('--tx', tx);
          this.style.setProperty('--ty', ty);
        } else {
          $(this).css('transform', 'translate(' + tx + ',' + ty + ')');
        }
      });
    });
  }

  /* ---------------------------------------------------------
     8. Tarjetas de tecnologías: spotlight + inclinación 3D
  --------------------------------------------------------- */
  $('.tech-card')
    .on('mousemove', function (e) {
      var $card = $(this);
      var offset = $card.offset();
      var w = $card.outerWidth();
      var h = $card.outerHeight();
      var x = e.pageX - offset.left;
      var y = e.pageY - offset.top;
      this.style.setProperty('--mx', x + 'px');
      this.style.setProperty('--my', y + 'px');

      if (enableMouseFx) {
        var rotY = ((x / w) - 0.5) * 7;
        var rotX = ((y / h) - 0.5) * -7;
        $card.css('transform', 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-4px)');
      }
    })
    .on('mouseleave', function () {
      $(this).css('transform', '');
    });

  /* ---------------------------------------------------------
     9. Botones magnéticos
  --------------------------------------------------------- */
  if (enableMouseFx) {
    $('.magnetic')
      .on('mousemove', function (e) {
        var $btn = $(this);
        var offset = $btn.offset();
        var x = e.pageX - offset.left - $btn.outerWidth() / 2;
        var y = e.pageY - offset.top - $btn.outerHeight() / 2;
        $btn.css('transform', 'translate(' + (x * 0.22).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)');
      })
      .on('mouseleave', function () {
        $(this).css('transform', '');
      });
  }

  /* ---------------------------------------------------------
     10. Casos de proyecto: inclinación suave
  --------------------------------------------------------- */
  if (enableMouseFx) {
    $('[data-tilt]')
      .on('mousemove', function (e) {
        var $el = $(this);
        var offset = $el.offset();
        var rx = ((e.pageX - offset.left) / $el.outerWidth()) - 0.5;
        var ry = ((e.pageY - offset.top) / $el.outerHeight()) - 0.5;
        $el.css('transform', 'perspective(1400px) rotateY(' + (rx * 6).toFixed(2) + 'deg) rotateX(' + (ry * -6).toFixed(2) + 'deg)');
      })
      .on('mouseleave', function () { $(this).css('transform', ''); });
  }

  /* ---------------------------------------------------------
     11. Lista de proyectos (index): vista previa flotante
  --------------------------------------------------------- */
  var $preview = $('.work-preview');

  if ($preview.length && enableMouseFx) {
    var $work = $('.work');
    $('.work-row')
      .on('mouseenter', function () {
        $preview.find('.work-preview-num').text($(this).find('.work-num').text());
        $preview.addClass('is-active');
      })
      .on('mouseleave', function () { $preview.removeClass('is-active'); })
      .on('mousemove', function (e) {
        var offset = $work.offset();
        $preview.css({ left: e.pageX - offset.left + 170, top: e.pageY - offset.top });
      });
  }

  /* ---------------------------------------------------------
     12. Hora local de Medellín
  --------------------------------------------------------- */
  var $time = $('.js-local-time');

  function updateTime() {
    try {
      $time.text(new Intl.DateTimeFormat('es-CO', {
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota'
      }).format(new Date()));
    } catch (err) {
      $time.text('--:--');
    }
  }

  if ($time.length) {
    updateTime();
    setInterval(updateTime, 30000);
  }

  /* ---------------------------------------------------------
     13. Copiar correo (Toast de Bootstrap)
  --------------------------------------------------------- */
  var toastEl = document.getElementById('copyToast');

  $('.copy-btn').on('click', function () {
    var $btn = $(this);
    var text = $btn.data('copy');

    function done() {
      $btn.addClass('is-copied').find('span').text('Copiado');
      if (toastEl) bootstrap.Toast.getOrCreateInstance(toastEl).show();
      setTimeout(function () {
        $btn.removeClass('is-copied').find('span').text('Copiar');
      }, 2200);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () {
        window.location.href = 'mailto:' + text;
      });
    } else {
      window.location.href = 'mailto:' + text;
    }
  });

  /* ---------------------------------------------------------
     14. Modal de proyectos (projects.html)
     jQuery maneja los botones, llena el contenido,
     abre el modal y detiene el video al cerrarlo.
  --------------------------------------------------------- */
  var $modalEl = $('#projectModal');

  if ($modalEl.length) {
    var projectModal = bootstrap.Modal.getOrCreateInstance($modalEl[0]);
    var $video = $('#projectVideo');
    var $placeholder = $('#videoPlaceholder');
    var $tags = $('#projectModalTags');

    $('.btn-view-project').on('click', function () {
      var $btn = $(this);
      var videoId = $.trim(String($btn.data('video') || ''));
      var tags = $.trim(String($btn.data('tags') || ''));

      $('#projectModalIndex').text($btn.data('index') || '');
      $('#projectModalLabel').text($btn.data('title') || 'Proyecto');
      $('#projectModalDesc').text($btn.data('desc') || '');

      $tags.empty();
      if (tags) {
        $.each(tags.split(','), function (_, tag) {
          $('<li class="tag"></li>').text($.trim(tag)).appendTo($tags);
        });
      }

      if (videoId) {
        $video
          .attr('src', 'https://www.youtube.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1&rel=0')
          .prop('hidden', false);
        $placeholder.prop('hidden', true);
      } else {
        $video.prop('hidden', true);
        $placeholder.prop('hidden', false);
      }

      projectModal.show();
    });

    $modalEl.find('.js-modal-close').on('click', function () {
      projectModal.hide();
    });

    $modalEl.on('hidden.bs.modal', function () {
      $video.attr('src', '').prop('hidden', true);
    });
  }

  /* ---------------------------------------------------------
     15. Volver arriba y año actual
  --------------------------------------------------------- */
  $('.js-to-top').on('click', function () {
    // El scroll suave del CSS se desactiva durante la animación de jQuery para evitar conflictos
    var $html = $('html').css('scroll-behavior', 'auto');
    $('html, body').stop().animate({ scrollTop: 0 }, reduceMotion ? 0 : 800, function () {
      $html.css('scroll-behavior', '');
    });
  });

  $('.current-year').text(new Date().getFullYear());

});
