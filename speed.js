 <script type='text/javascript'>
//<![CDATA[
// Configuración de rendimiento
(function() {
    // 1. Usar Passive Event Listeners para scroll
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() { supportsPassive = true; }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {}
    
    // 2. Optimizar eventos de scroll
    var scrollEvents = ['scroll', 'wheel', 'touchmove'];
    scrollEvents.forEach(function(eventName) {
        window.addEventListener(eventName, function() {}, supportsPassive ? { passive: true } : false);
    });
    
    // 3. Dividir tareas largas
    function scheduleTasks(tasks) {
        var index = 0;
        function executeNext() {
            if (index < tasks.length) {
                tasks[index]();
                index++;
                setTimeout(executeNext, 10);
            }
        }
        executeNext();
    }
    
    // 4. Ejecutar inicializaciones pesadas en orden
    scheduleTasks([
        function() { if (typeof inicializarMenuEfemerides === 'function') inicializarMenuEfemerides(); },
        function() { if (typeof showrecentposts2 === 'function') showrecentposts2(); },
        function() { if (typeof showrecentposts5 === 'function') showrecentposts5(); },
        function() { if (typeof showrecentposts6 === 'function') showrecentposts6(); }
    ]);
    
    // 5. Monitorear Long Tasks
    if ('PerformanceObserver' in window) {
        var observer = new PerformanceObserver(function(list) {
            list.getEntries().forEach(function(entry) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration, 'ms');
                }
            });
        });
        observer.observe({ entryTypes: ['longtask'] });
    }
})();
//]]>
</script>