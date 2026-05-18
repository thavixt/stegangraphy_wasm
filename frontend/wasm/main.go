package main

import (
	"fmt"
	"syscall/js"
	"time"
)

func main() {
	js.Global().Set("greet", js.FuncOf(greet))
	js.Global().Set("decode", js.FuncOf(decode))
	js.Global().Set("wasm_result", js.TypeString.String())
	// Keep the program running
	select {}
}

func greet(this js.Value, args []js.Value) interface{} {
	name := "curious netizen"
	if len(args) > 0 {
		name = args[0].String()
	}
	message := fmt.Sprintf("Welcome, %s - greetings from Go running in WASM! =)", name)
	return message
}

func readLSB(bytes []byte, progressCb js.Value) string {
	var messageBits []byte
	total := len(bytes)

	for i, b := range bytes {
		// Extract the least significant bit (LSB)
		bit := b & 1
		messageBits = append(messageBits, bit)

		// Update progress every 5% to avoid over-calling the JS bridge
		if !progressCb.IsUndefined() && i%(total/20+1) == 0 {
			progressCb.Invoke(float64(i) / float64(total) * 50) // First 50% for bit extraction
		}
	}

	var decodedMessage []byte
	var currentByte byte
	bitCount := 0

	for _, bit := range messageBits {
		currentByte = (currentByte << 1) | bit
		bitCount++
		if bitCount == 8 {
			decodedMessage = append(decodedMessage, currentByte)
			currentByte = 0
			bitCount = 0
			time.Sleep(500 * time.Millisecond)
			// Update progress for the remaining 50% (decoding phase)
			if !progressCb.IsUndefined() && len(decodedMessage)%(len(messageBits)/8/10+1) == 0 {
				p := 50 + (float64(len(decodedMessage)) / float64(len(messageBits)/8) * 50)
				progressCb.Invoke(p)
			}
		}
	}

	if !progressCb.IsUndefined() {
		progressCb.Invoke(100)
	}
	return string(decodedMessage)
}

func decode(this js.Value, args []js.Value) interface{} {
	if len(args) > 0 {
		src := args[0]
		var progressCb js.Value
		if len(args) > 1 {
			progressCb = args[1]
		}

		u8 := js.Global().Get("Uint8Array").New(src)
		buf := make([]byte, u8.Length())
		n := js.CopyBytesToGo(buf, u8)
		return readLSB(buf[:n], progressCb)
	}
	return nil
}
