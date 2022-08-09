# import tensorflow as tf
import xml.etree.ElementTree as ET

tree = ET.parse('tennis-court-locator/dataset/labeled-images/labels_test-tennis-court-locator_2022-08-08-09-52-57/Lexington Park.xml')
root = tree.getroot()

height = int(root[4][1].text)
width = int(root[4][0].text)
filename = root[1].text
image_format = b'png'

xmin_fromXML = float(root[5][4][0].text)
xmax_fromXML = float(root[5][4][2].text)
ymin_fromXML = float(root[5][4][1].text)
ymax_fromXML = float(root[5][4][3].text)

xmins = [xmin_fromXML / width]
xmaxs = [xmax_fromXML  / width]
ymins = [ymin_fromXML / height]
ymaxs = [ymax_fromXML / height]
classes_text = ['Court']
classes = [1]

print(height)
print(width)
print(filename)
print(xmin_fromXML)
print(xmax_fromXML)
print(ymin_fromXML)
print(ymax_fromXML)
print(xmins)
print(xmaxs)
print(ymins)
print(ymaxs)