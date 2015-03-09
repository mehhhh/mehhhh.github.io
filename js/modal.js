/**
 * Created by jhtan on 3/8/15.
 */
(function ($) {
    "use strict";
    $(document).ready(function () {
        $('.continuePlaying').click(function () {
            game.paused = false;
        });

        $('.playAgain').click(function () {
            location.reload();
        });

        $('#welcomeModal').modal()

        window.showAtmModal = function showAtmModal() {
            $('#atmModal').modal();
        };

        window.showGameOverModal = function showGameOverModal() {
            $('#gameOverModal').modal();
        }

        window.showPhishingModal = function showPhishingModal() {
            $('#phishingModal').modal();
        }
    });
})(jQuery);
