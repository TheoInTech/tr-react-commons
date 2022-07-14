import { useState, useEffect } from "react"

export const useDebounce = (value, delayMs = 100) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, delayMs)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [value, delayMs])

	return debouncedValue
}

export const useInputValue = (initialValue, formatter) => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e) => setValue(formatter(e.target.value))

	return {
		value,
		setValue,
		onChange,
	}
}

export const useInterval = (
	callback,
	intervalMs = 1000,
	dependencies = [],
) => {
	useEffect(() => {
		let intervalId = null

		if (callback) intervalId = setInterval(callback, intervalMs)

		return () => {
			if (intervalId) clearInterval(intervalId)
		}
	}, [callback, intervalMs, dependencies])
}

const useClickOutside = (
	ref,
	callback,
	additionalCondition = true,
) => {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (
				ref.current &&
				!ref.current.contains(event.target) &&
				additionalCondition
			) {
				callback()
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [ref, additionalCondition])
}

export default {
    useDebounce,
    useInputValue,
    useInterval,
    useClickOutside
}