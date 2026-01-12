import json
import numpy as np

with open("rf.json", "r", encoding="utf-8") as f:
    data = json.load(f)

records = data["records"]

bw_values = [
    item["bw_khz"]
    for item in records
    if "bw_khz" in item and isinstance(item["bw_khz"], (int, float))
]

print(f"Loaded {len(bw_values)} bandwidth values")


# ===== SLIDER GENERATION =====

NUM_SLIDER_POINTS = 15

bw_sorted = np.array(sorted(bw_values))

# Split into 15 equally populated groups
bins = np.array_split(bw_sorted, NUM_SLIDER_POINTS)

# Use median of each group as slider value
slider_points = [int(np.median(b)) for b in bins]

print("Slider points (kHz):")
for i, v in enumerate(slider_points):
    print(f"{i+1:2d}: {v}")
