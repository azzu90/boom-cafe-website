# Menu images

## Processing script

`scripts/process-menu-image.mjs` turns any product photo into a uniform menu image (uses `sharp`, a devDependency).

```bash
node scripts/process-menu-image.mjs <input-file> <output-file.webp>
```

Steps, always identical:

1. Load the image and flatten transparency onto white.
2. Remove the background: flood-fill from all four borders over pixels within ±40 per channel of the border color (light gray shadows included) and set them to pure black `#000000`. Pixels not connected to the border (e.g. white labels) stay unchanged.
3. Trim tightly to the product.
4. Scale so the product's longer side is exactly 564 px (aspect ratio kept).
5. Center it on a 600x600 canvas with a pure black background.
6. Save as WebP, quality 85.
7. Print the final product width and height.

## Folder convention

`public/menu/<folder>/`, using the category's existing folder:

`kava`, `soft`, `cijedeni`, `pivo`, `cyder`, `vino`, `pjenusci`, `kokteli`, `spritz`

For a category without a folder, create one with a lowercase ASCII name, e.g. `voda`, `zimska`, `domaca`, `strana`, `gin`, `rum`, `vodka`, `posebno`.

## File name convention

Lowercase ASCII slug of the item name:

- `č`/`ć` -> `c`, `š` -> `s`, `ž` -> `z`, `đ` -> `d`
- spaces -> `-`

If two items share a name, append the size, e.g. `freixenet-020.webp`, `freixenet-075.webp`.
