from django.shortcuts import render
from django.http import HttpResponse
# from django.core.files.storage import FileSystemStorage
import cv2
import numpy as np
import tempfile

# Create your views here.
def home(request):
    result = None
    if request.method == "POST":
        original = request.FILES["original_image"]
        suspected = request.FILES["suspected_image"]

        with tempfile.NamedTemporaryFile(delete=True, suffix=".jpg") as tmp1, \
             tempfile.NamedTemporaryFile(delete=True, suffix=".jpg") as tmp2:

            # Write uploaded file content into temporary files
            for chunk in original.chunks():
                tmp1.write(chunk)
            tmp1.flush()

            for chunk in suspected.chunks():
                tmp2.write(chunk)
            tmp2.flush()

            # --- Compare with OpenCV ---
            img1 = cv2.imread(tmp1.name)
            img2 = cv2.imread(tmp2.name)

            if img1 is None or img2 is None:
                result = "⚠️ Error reading one or both files."
            else:
                img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))
                diff = cv2.absdiff(img1, img2)
                gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
                _, thresh = cv2.threshold(gray, 30, 255, cv2.THRESH_BINARY)
                diff_pixels = cv2.countNonZero(thresh)

                if diff_pixels > 1000:
                    result = "❌ Suspected PAN card is tampered!"
                else:
                    result = "✅ PAN card appears authentic."

    return render(request, "pancard/home.html", {"result": result})

