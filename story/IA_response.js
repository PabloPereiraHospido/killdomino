/**
 * Triggers a scripted AI dialogue sequence based on the provided scene number.
 * Each case plays a sequence of messages through {@link TTS} with appropriate
 * delays between lines.
 *
 * @param {number} number - Identifier of the dialogue scene to play:
 *   - `1` – Opening monologue ("Hello dear friend…").
 *   - `2` – Acknowledgement that the player knows how to play.
 * @returns {Promise<void>}
 */
async function iaTalk(number) {

    switch (number) {
        case 1:
            await esperar(1000);
            TTS("Hello dear friend...")
            await esperar(5000);
            TTS("We are gonna play a game of dice")
            await esperar(6000);
            TTS("I hope you are ready, becouse is gonna be a lot of fun")
            break;
        case 2:
            await esperar(1000);
            TTS("I see you know how to play this game")
            break;    
        default:
            TTS("Algo ha salido mal")
            break;    
    }
}