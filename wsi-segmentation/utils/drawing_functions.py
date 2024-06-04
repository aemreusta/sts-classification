from PIL import Image, ImageDraw
from shapely.geometry import MultiPolygon


def draw_segmentation_mask(
    image_size,
    geojson_polygons,
    scale,
    outline_color=(255, 255, 255),
    fill_color=(255, 255, 255),
    background_color=(0, 0, 0),
):
    """
    Create a segmentation mask from geojson polygons.

    Args:
        image_size (tuple): (width, height) of the image.
        geojson_polygons (list): List of geojson polygons.
        scale (float): Scale of the image.
        outline_color (tuple): Color of the outline (default is white).
        fill_color (tuple): Color of the fill (default is white).
        background_color (tuple): Color of the background (default is black).

    Returns:
        PIL.Image.Image: Segmentation mask image.
    """
    # Create a new image
    img = Image.new("RGB", image_size, background_color)
    draw = ImageDraw.Draw(img)

    if img.mode != "RGB":
        raise ValueError("Image must be in RGB mode.")

    # Draw the polygons
    for polygon in geojson_polygons:
        # print(type(polygon), polygon)
        polygon_list = []

        if type(polygon) == MultiPolygon:
            for p in polygon.geoms:
                polygon_list.extend(
                    [(x / scale, y / scale) for x, y in p.exterior.coords]
                )

        else:
            # Convert geometry coordinates to image coordinates
            polygon_list = [(x / scale, y / scale) for x, y in polygon.exterior.coords]

        # print(polygon_list)
        # Draw the polygon outline
        draw.polygon(polygon_list, outline=outline_color, fill=fill_color)

    return img


def annotate_images(
    image, geojson_polygons, scale, outline_color=(0, 255, 0, 255), fill_color=None
):
    """
    Draw GeoJSON objects on an RGB image.

    Parameters:
    - image: PIL Image object (RGB mode) to draw on.
    - geojson_features: List of GeoJSON features with geometries to draw.
    - outline_color: Tuple (R, G, B, A) representing the outline color (default: green with full opacity).
    - fill_color: Tuple (R, G, B, A) representing the fill color (default: None, no fill).

    Returns:
    - PIL Image object with drawn GeoJSON objects.
    """
    draw = ImageDraw.Draw(image, "RGBA")

    for polygon in geojson_polygons:
        # print(type(polygon), polygon)
        polygon_list = []

        if type(polygon) == MultiPolygon:
            for p in polygon.geoms:
                polygon_list.extend(
                    [(x / scale, y / scale) for x, y in p.exterior.coords]
                )

        else:
            # Convert geometry coordinates to image coordinates
            polygon_list = [(x / scale, y / scale) for x, y in polygon.exterior.coords]

        # Draw the polygon outline
        draw.polygon(polygon_list, outline=outline_color, fill=fill_color)

    return image
