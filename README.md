[![Comp](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/c/tiny-stack-vm-01-run-20261122)
[![Rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/lumuti118/makefun-tiny-stack-vm-01/rank.svg)](https://make.fun/c/tiny-stack-vm-01-run-20261122)
[![Reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/lumuti118/makefun-tiny-stack-vm-01/reward.svg)](https://make.fun/c/tiny-stack-vm-01-run-20261122)

# Tiny Stack VM

A faithful interpreter for make.fun's tiny stack ISA: 32-bit wrapping arithmetic, a 256-value stack, calls, 256 words of memory, input/output, and all ten traps with their exact exit codes, plus the step and output limits. One run answers all 40 instances. Practice set: 40/40 answered, score 1,000,000.

## Run it

```
node main.ts
```

It reads `/input/<id>/program.bin` and `input.bin` and writes `/output/<id>/stdout.bin` and `exit.txt`. Local test: `MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts`

Built for [make.fun](https://make.fun/r/7vjqmhmr).
