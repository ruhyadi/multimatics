package utils

import (
	"fmt"
	"time"
)

func ChannelExample001() {
	ch := make(chan int)

	go func() {
		for i := 1; i <= 5; i++ {
			ch <- i
			time.Sleep(time.Second)
		}
		close(ch)
	}()

	for val := range ch {
		fmt.Println(val)
	}

	fmt.Println("All values received from the channel")
}
